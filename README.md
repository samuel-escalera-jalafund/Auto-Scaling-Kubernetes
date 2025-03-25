# Demo de Auto Scaling con Kubernetes
Esta demostración muestra cómo configurar Auto Scaling horizontal en Kubernetes usando una aplicación React básica con métricas de CPU y memoria.

## Prerrequisitos
- Docker Desktop con Kubernetes habilitado
- kubectl instalado
- hey: tool para hacer pruebas de carga (opcional)

## Estructura de archivos
```
auto-scaling-demo/
├── app/                  # Aplicación React
│   ├── src/              # Código fuente
│   ├── Dockerfile        # Configuración Docker
│   └── nginx.conf        # Configuración Nginx
└── k8s/
    ├── deployment.yaml   # Configuración del Deployment
    └── hpa.yaml         # Configuración del Auto Scaling
```

## Configuración inicial
1. Clona este repositorio:

```
git clone https://github.com/samuel-escalera-jalafund/Auto-Scaling-Kubernetes.git
```

2. Habilita Kubernetes en Docker Desktop:

- Abre Docker Desktop
- Ve a Settings > Kubernetes
- Marca "Enable Kubernetes"
- Haz clic en "Apply & Restart"

## Construcción de la aplicación
1. Construye la imagen Docker:

```
docker build -t react-auto-scaling-demo:1.0 ./app
```

## Despliegue en Kubernetes
1. Aplica las configuraciones:

```
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/hpa.yaml
```

2. Verifica el estado:

- Terminal 1
```
kubectl get pods --watch
```

- Terminal 2
```
kubectl get hpa --watch
```


## Prueba de Auto Scaling
1. Genera carga con hey:

```
hey -n 10000 -c 100 http://localhost 
```

2. Monitorea el escalado (en otra terminal):

- Terminal 1
```
kubectl get pods --watch
```

- Terminal 2
```
kubectl get hpa --watch
```


**Qué esperar**

- Inicialmente verás 2 pods
- Cuando la carga supere el 20% de CPU o 50% de memoria:
    - Kubernetes creará nuevos pods (hasta 10)
    - El HPA mostrará el aumento en "TARGETS"
- Al terminar la carga, los pods extra se eliminarán

## Limpieza
Para eliminar todos los recursos:

```
kubectl delete -f k8s/
```