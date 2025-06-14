# Exercise 1.10 – Even More Services

## 🎯 Goal

Split the `log-output` application into two separate containers **within a single Pod** using Kubernetes multi-container Pods.

- **logger container**: 
  - On startup, generates a random string.
  - Every 5 seconds, writes a line to a file containing the string and the current timestamp.

- **reader container**: 
  - Serves an HTTP endpoint on `/logs` that reads and returns the content of the shared file.

Both containers **share a volume** (`EmptyDir`) mounted at `/usr/logs`.

---

## 📁 Project Structure

log-output-multicontainer/
├── logger/
│ ├── Dockerfile
│ └── index.js
├── reader/
│ ├── Dockerfile
│ └── index.js
└── manifests/
└── log-multicontainer.yaml

yaml
Copy
Edit

---

## 🐳 Dockerfiles

### `logger/Dockerfile`
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
reader/Dockerfile
dockerfile
Copy
Edit
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
⚙️ Kubernetes Manifest
manifests/log-multicontainer.yaml
Defines a single Pod with:

Two containers: logger and reader.

A shared emptyDir volume mounted at /usr/logs.

yaml
Copy
Edit
apiVersion: v1
kind: Pod
metadata:
  name: log-multicontainer
spec:
  volumes:
    - name: shared-logs
      emptyDir: {}
  containers:
    - name: logger
      image: your-dockerhub-username/logger:1.0
      volumeMounts:
        - name: shared-logs
          mountPath: /usr/logs
    - name: reader
      image: your-dockerhub-username/reader:1.0
      ports:
        - containerPort: 3000
      volumeMounts:
        - name: shared-logs
          mountPath: /usr/logs
Replace your-dockerhub-username with your actual Docker Hub username or use local images if working with k3d.

🚀 Steps to Run
1. Build and Push Docker Images
bash
Copy
Edit
# Logger app
docker build -t <your-dockerhub-username>/logger:1.0 ./logger
docker push <your-dockerhub-username>/logger:1.0

# Reader app
docker build -t <your-dockerhub-username>/reader:1.0 ./reader
docker push <your-dockerhub-username>/reader:1.0
2. Apply the Kubernetes Manifest
bash
Copy
Edit
kubectl apply -f manifests/log-multicontainer.yaml
3. Port Forward and Test
bash
Copy
Edit
kubectl port-forward pod/log-multicontainer 8080:3000
Visit http://localhost:8080/logs in your browser or via curl:

bash
Copy
Edit
curl http://localhost:8080/logs
📝 Commit and Push
bash
Copy
Edit
git add .
git commit -m "Exercise 1.10: Multi-container pod with logger and reader"
git push origin main

git tag -a v1.10 -m "Add multi-container log-output with shared volume"
git push origin v1.10
👉 Then publish the release at:

ruby
Copy
Edit
https://github.com/<your-username>/<your-repo>/releases/tag/v1.10
✅ Output Example
makefile
Copy
Edit
2025-06-14T10:50:00Z RandomString-abc123
2025-06-14T10:50:05Z RandomString-abc123
2025-06-14T10:50:10Z RandomString-abc123
