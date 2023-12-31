import subprocess
import psutil
import time
import json
import sys

def average(lst):
    return sum(lst) / len(lst)

def standard_deviation(lst):
    avg = average(lst)
    variance = sum([pow(x-avg,2) for x in lst]) / len(lst)
    return pow(variance, 0.5)

def measure_command(command):
    # Inicializa uma lista para armazenar as medições
    measurements = []

    # Converte o comando em uma lista
    command_list = command.split()

    # Inicializa o tempo de início
    start_time = time.time()

    # Inicializa o processo com psutil
    process = psutil.Popen(command_list, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # Realiza medições enquanto o processo está em execução
    while process.is_running():  # Enquanto o processo estiver em execução
        time.sleep(0.1)  # Aguarda 100ms
        try:
            # for c in iter(lambda: process.stdout.read(1), b""):
            #   sys.stdout.buffer.write(c)
            
            # for c in iter(lambda: process.stderr.read(1), b""):
            #   sys.stderr.buffer.write(c)

            # Obtém as informações de CPU e memória
            cpu_percent = process.cpu_percent()
            if cpu_percent == 0:
                continue
            memory = process.memory_info()

            # Adiciona as medições à lista
            measurements.append({
                "time": time.time() - start_time,
                "cpu_percent": cpu_percent,
                "memory_rss": memory.rss,
                "memory_vms": memory.vms,
                "cpu_times": process.cpu_times()._asdict(),
            })
        except psutil.NoSuchProcess:
            break

    # Obtém o tempo de término
    end_time = time.time()

    # Adiciona as medições de tempo à lista
    # measurements.append({
    #     "time": end_time - start_time,
    #     "total_time": end_time - start_time
    # })

    result = {
        "command": command,
        "time_execution": end_time - start_time,
        "results": measurements
    }

    n = len(measurements)

    # Calcula medias e desvios padrão
    result["cpu_percent_mean"] = average([x["cpu_percent"] for x in measurements])
    result["cpu_percent_std"] = standard_deviation([x["cpu_percent"] for x in measurements])
    result["memory_rss_mean"] = average([x["memory_rss"] for x in measurements])
    result["memory_rss_std"] = standard_deviation([x["memory_rss"] for x in measurements])
    result["memory_vms_mean"] = average([x["memory_vms"] for x in measurements])
    result["memory_vms_std"] = standard_deviation([x["memory_vms"] for x in measurements])
    result["time_mean"] = average([x["time"] for x in measurements])
    result["time_std"] = standard_deviation([x["time"] for x in measurements])
    result["cpu_times_mean"] = {
        "user": average([x["cpu_times"]["user"] for x in measurements]),
        "system": average([x["cpu_times"]["system"] for x in measurements]),
        "children_user": average([x["cpu_times"]["children_user"] for x in measurements]),
        "children_system": average([x["cpu_times"]["children_system"] for x in measurements]),
    }
    result["cpu_times_std"] = {
        "user": standard_deviation([x["cpu_times"]["user"] for x in measurements]),
        "system": standard_deviation([x["cpu_times"]["system"] for x in measurements]),
        "children_user": standard_deviation([x["cpu_times"]["children_user"] for x in measurements]),
        "children_system": standard_deviation([x["cpu_times"]["children_system"] for x in measurements]),
    }

    return result

if __name__ == "__main__":
    # Substitua "seu_comando_aqui" pelo comando que você deseja medir
    command_to_measure = "npx qawolf test --headless"

    # Mede o comando enquanto ele está em execução
    results = measure_command(command_to_measure)

    # Exibe as medições em formato JSON
    print(json.dumps(results, indent=2))
