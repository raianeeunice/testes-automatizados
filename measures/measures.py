from matplotlib import pyplot as plt
from scipy.stats import kruskal
from heatmap import annotate_heatmap, heatmap
import numpy as np
import scikit_posthocs as sp
import json
import pathlib


def calculate_statistical_test(measure, labels, groups_arr):
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
    plt.savefig(pathlib.Path("images").joinpath(
        f'heatmap-{measure}.png'))

    # generate boxplot
    fig7, ax7 = plt.subplots()
    ax7.set_title('Boxplot das amostras para "{}"'.format(measure))
    ax7.boxplot(groups_arr, showfliers=False, labels=labels)
    plt.xticks(rotation = 90)
    fig7.tight_layout()
    plt.savefig(pathlib.Path("images").joinpath(
        f'boxplot-{measure}.png'))
    
def run():
    # labels = ['qawolf', 'cypress', 'testcafe', 'webdriverio']
    measures = ['time']

    # open result.json
    with open('result.json') as f:
        data = json.load(f)
        data = data['results']
        # get labels and times
        labels = [x['command'] for x in data]
        times = [x['times'] for x in data]
        # calculate statistical test for each measure
        for measure in measures:
            groups_arr = []
            for time in times:
                groups_arr.append(time)
            # np_groups_arr = np.array(groups_arr)
            calculate_statistical_test(measure, labels, groups_arr)

run()