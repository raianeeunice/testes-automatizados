from scipy.stats import kruskal
from heatmap import annotate_heatmap, heatmap
import scikit_posthocs as sp
import numpy as np
import pathlib
import json
import matplotlib.pyplot as plt

def calculate_statistical_test(measure, labels, title, groups_arr):
    # Nemenyi test
    # https://scikit-posthocs.readthedocs.io/en/latest/generated/scikit_posthocs.posthoc_nemenyi.html
    # used to compare multiple algorithms
    n_result = sp.posthoc_nemenyi(groups_arr, sort=True)

    # generate heatmap
    fig, ax = plt.subplots()
    ax.set_title(f'Valor p-value de Nemenyi para medida {measure}')
    im, cbar = heatmap(n_result, labels, labels, ax=ax,
                       cmap="YlGn_r", vmin=0, vmax=1, cbarlabel="p-values")
    texts = annotate_heatmap(im, valfmt="{x:.2f}")
    fig.tight_layout()
    plt.savefig(
        pathlib.Path("images").joinpath(f'heatmap-{measure}.png'),
        dpi=300
    )

    # generate boxplot
    fig_boxplot, ax_boxplot = plt.subplots()
    ax_boxplot.set_title(title)
    ax_boxplot.boxplot(groups_arr, showfliers=False, labels=labels)
    # add jitter to boxplot
    for i, group in enumerate(groups_arr):
        x = np.random.normal(i + 1, 0.04, size=len(group))
        ax_boxplot.plot(x, group, 'ro', alpha=0.2)
    plt.xticks(rotation = 90)
    fig_boxplot.tight_layout()
    plt.savefig(
        pathlib.Path("images").joinpath(f'boxplot-{measure}.png'),
        dpi=300
    )
    

# Create a plot for each measure
# CPU is a green line plot
# Memory is a blue area plot
def create_time_stamp_plot(sample_milliseconds, cpu_percentages, memory_bytes, labels, title, file_name):
    fig, ax = plt.subplots(figsize=(10, 5))

    ax.set_title(title)
    ax.set_xlabel('Tempo (ms)')
    ax.set_ylabel('Porcentagem de CPU')

    ax2 = ax.twinx()
    ax2.set_ylabel('Memória (bytes)')
    
    # blue area plot
    ax2.fill_between(sample_milliseconds, memory_bytes, color='blue', alpha=0.2, linewidth=1)
    
    # green line plot
    ax.plot(sample_milliseconds, cpu_percentages, color='green', linewidth=1, alpha=0.6)
    
    # saving plot
    plt.savefig(pathlib.Path("images").joinpath(file_name), dpi=300)


def generate_measures_csv(labels, measures):
    csv_file = open('result_cmdbench.csv', 'w')
    csv_content = 'name,cpu_total_times,memory_max_values,memory_max_per_process_values,execution_time,cpu_percentages,disk_write_bytes,disk_read_bytes,memory_usage\n'
    for i, label in enumerate(labels):
        # statistics
        cpu_total_times_mean = np.mean(measures['cpu_total_times'][i])
        cpu_total_times_std = np.std(measures['cpu_total_times'][i])
        cpu_percentages_mean = np.mean(measures['cpu_percentages'][i])
        cpu_percentages_std = np.std(measures['cpu_percentages'][i])
        disk_write_bytes_mean = np.mean(measures['disk_write_bytes'][i])
        disk_write_bytes_std = np.std(measures['disk_write_bytes'][i])
        disk_read_bytes_mean = np.mean(measures['disk_read_bytes'][i])
        disk_read_bytes_std = np.std(measures['disk_read_bytes'][i])
        memory_usage_mean = np.mean(measures['memory_usage'][i])
        memory_usage_std = np.std(measures['memory_usage'][i])
        memory_max_values_mean = np.mean(measures['memory_max_values'][i])
        memory_max_values_std = np.std(measures['memory_max_values'][i])
        memory_max_per_process_values_mean = np.mean(measures['memory_max_per_process_values'][i])
        memory_max_per_process_values_std = np.std(measures['memory_max_per_process_values'][i])
        execution_time_mean = np.mean(measures['execution_time'][i])
        execution_time_std = np.std(measures['execution_time'][i])
        
        # numbers rounded to 2 decimal places in format
        csv_content += "%s,%.2f ±%.2f,%.2f ±%.2f,%.2f ±%.2f,%.2f ±%.2f,%.2f ±%.2f,%.2f ±%.2f,%.2f ±%.2f,%.2f ±%.2f\n" % (
            label,
            cpu_total_times_mean, cpu_total_times_std,
            memory_max_values_mean, memory_max_values_std,
            memory_max_per_process_values_mean, memory_max_per_process_values_std,
            execution_time_mean, execution_time_std,
            cpu_percentages_mean, cpu_percentages_std,
            disk_write_bytes_mean, disk_write_bytes_std,
            disk_read_bytes_mean, disk_read_bytes_std,
            memory_usage_mean, memory_usage_std
        )

    csv_file.write(csv_content)


def run():
    # open result.json
    with open('result_real.json') as f:
        data = json.load(f)
        
        for case in data:
            name = case['name']
            results = case['results']
            for result in results:
                result['cpu_percentage_mean'] = np.mean(result['time_series']['cpu_percentages'])
                result['memory_usage_mean'] = np.mean(result['time_series']['memory_bytes'])
            first_result = case['results'][2]

            # plot time_stamp of first result
            create_time_stamp_plot(
                first_result["time_series"]['sample_milliseconds'], 
                first_result["time_series"]['cpu_percentages'], 
                first_result["time_series"]['memory_bytes'], 
                [name], 
                f'Uso de CPU e memória para uma instância de {name}', 
                f'time_stamp_plot_{name}.png'
            )
        
        # get labels and times
        labels = [x['name'] for x in data]
        results = [x['results'] for x in data]
        times = [[y['process']['execution_time'] for y in x] for x in results]
        cpu_total_times = [[y['cpu']['total_time'] for y in x] for x in results]
        cpu_percentages = [[y['cpu_percentage_mean'] for y in x] for x in results]
        disk_read_bytes = [[y['disk']['read_bytes'] for y in x] for x in results]
        disk_write_bytes = [[y['disk']['write_bytes'] for y in x] for x in results]
        memory_usage = [[y['memory_usage_mean'] for y in x] for x in results]
        memory_max_values = [[y['memory']['max'] for y in x] for x in results]
        memory_max_per_process_values = [[y['memory']['max_perprocess'] for y in x] for x in results]

        # measures = ['cpu_total_times', 'memory_max_values', 'memory_max_per_process_values', 'execution_time']
        measures = {
            'cpu_total_times': cpu_total_times,
            'cpu_percentages': cpu_percentages,
            'disk_read_bytes': disk_read_bytes,
            'disk_write_bytes': disk_write_bytes,
            'memory_usage': memory_usage,
            'memory_max_values': memory_max_values,
            'memory_max_per_process_values': memory_max_per_process_values,
            'execution_time': times
        }
        measure_titles = {
            'cpu_total_times': 'Tempo total de CPU (ms)',
            'cpu_percentages': 'Porcentagem de CPU média (%)',
            'disk_read_bytes': 'Bytes lidos no disco',
            'disk_write_bytes': 'Bytes escritos no disco',
            'memory_usage': 'Uso médio de memória (bytes)',
            'memory_max_values': 'Máximo de memória (bytes)',
            'memory_max_per_process_values': 'Máximo de memória por processo (bytes)',
            'execution_time': 'Tempo de execução (ms)'
        }

        for measure, values in measures.items():
            title = measure_titles[measure]
            groups_arr = []
            for value in values:
                groups_arr.append(value)
            # np_groups_arr = np.array(groups_arr)
            calculate_statistical_test(measure, labels, title, groups_arr)

        generate_measures_csv(labels, measures)




run()