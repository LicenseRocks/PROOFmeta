{{/*
Expand the name of the chart.
*/}}
{{- define "creators-hub-app.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "creators-hub-app.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "creators-hub-app.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default project name.
*/}}
{{- define "creators-hub-app.app.projectName" -}}
{{- if .Values.app.projectName }}
{{- .Values.app.projectName | trunc 63 }}
{{- else }}
{{- required "Project name is required"  }}
{{- end }}
{{- end }}


{{/*
Common labels
*/}}
{{- define "creators-hub-app.app.deployment.labels" -}}
helm.sh/chart: {{ include "creators-hub-app.chart" . }}
app.kubernetes.io/name: "{{ .Values.app.type }}"
{{/*
#app.kubernetes.io/component: "{{ .Values.app.deployment.image.repository }}"
app.kubernetes.io/version: "{{ .Values.app.deployment.image.tag }}"
*/}}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "creators-hub-app.app.container.labels" -}}
{{- include "creators-hub-app.app.deployment.labels" . }}
{{- end -}}

{{- define "creators-hub-app.app.deployment.matchLabels" -}}
{{- include "creators-hub-app.app.container.labels" . }}
{{- end -}}

{{/*
Frontend labels
*/}}
{{- define "creators-hub-app.frontend.deployment.labels" -}}
helm.sh/chart: {{ include "creators-hub-app.chart" . }}
app.kubernetes.io/name: frontend
{{/*
app.kubernetes.io/component: "{{ .Values.app.frontend.deployment.image.repository }}"
app.kubernetes.io/version: "{{ .Values.app.frontend.deployment.image.tag }}"
*/}}
{{- end }}
{{- define "creators-hub-app.frontend.container.labels" -}}
{{- include "creators-hub-app.frontend.deployment.labels" . }}
{{- end -}}
{{- define "creators-hub-app.frontend.deployment.matchLabels" -}}
{{- include "creators-hub-app.frontend.container.labels" . }}
{{- end -}}

{{/*
Backend django
*/}}
{{- define "creators-hub-app.backend_django.deployment.labels" -}}
helm.sh/chart: {{ include "creators-hub-app.chart" . }}
app.kubernetes.io/name: backend_django
{{/*
app.kubernetes.io/component: "{{ .Values.app.backend_django.deployment.image.repository }}"
app.kubernetes.io/version: "{{ .Values.app.backend_django.deployment.image.tag }}"
*/}}
{{- end }}
{{- define "creators-hub-app.backend_django.container.labels" -}}
{{- include "creators-hub-app.backend_django.deployment.labels" . }}
{{- end -}}
{{- define "creators-hub-app.backend_django.deployment.matchLabels" -}}
{{- include "creators-hub-app.backend_django.container.labels" . }}
{{- end -}}

{{/*
Backend nodejs
*/}}
{{- define "creators-hub-app.backend_nodejs.deployment.labels" -}}
helm.sh/chart: {{ include "creators-hub-app.chart" . }}
app.kubernetes.io/name: backend_nodejs
{{/*
app.kubernetes.io/component: "{{ .Values.app.backend_nodejs.deployment.image.repository }}"
app.kubernetes.io/version: "{{ .Values.app.backend_nodejs.deployment.image.tag }}"
*/}}
{{- end }}
{{- define "creators-hub-app.backend_nodejs.container.labels" -}}
{{- include "creators-hub-app.backend_nodejs.deployment.labels" . }}
{{- end -}}
{{- define "creators-hub-app.backend_nodejs.deployment.matchLabels" -}}
{{- include "creators-hub-app.backend_nodejs.container.labels" . }}
{{- end -}}

{{/*
Backend celery
*/}}
{{- define "creators-hub-app.backend_celery.deployment.labels" -}}
helm.sh/chart: {{ include "creators-hub-app.chart" . }}
app.kubernetes.io/name: backend_celery
{{/*
app.kubernetes.io/component: "{{ .Values.app.backend_celery.deployment.image.repository }}"
app.kubernetes.io/version: "{{ .Values.app.backend_celery.deployment.image.tag }}"
*/}}
{{- end }}
{{- define "creators-hub-app.backend_celery.container.labels" -}}
{{- include "creators-hub-app.backend_celery.deployment.labels" . }}
{{- end -}}
{{- define "creators-hub-app.backend_celery.deployment.matchLabels" -}}
{{- include "creators-hub-app.backend_celery.container.labels" . }}
{{- end -}}

{{/*
Backend celery-beat
*/}}
{{- define "creators-hub-app.backend_celery_beat.deployment.labels" -}}
helm.sh/chart: {{ include "creators-hub-app.chart" . }}
app.kubernetes.io/name: backend_celery_beat
{{/*
app.kubernetes.io/component: "{{ .Values.app.backend_celery_beat.deployment.image.repository }}"
app.kubernetes.io/version: "{{ .Values.app.backend_celery_beat.deployment.image.tag }}"
*/}}
{{- end }}
{{- define "creators-hub-app.backend_celery_beat.container.labels" -}}
{{- include "creators-hub-app.backend_celery_beat.deployment.labels" . }}
{{- end -}}
{{- define "creators-hub-app.backend_celery_beat.deployment.matchLabels" -}}
{{- include "creators-hub-app.backend_celery_beat.container.labels" . }}
{{- end -}}

{{/*
Custom deployment
*/}}
{{- define "creators-hub-app.custom.deployment.labels" -}}
helm.sh/chart: {{ include "creators-hub-app.chart" . }}
app.kubernetes.io/name: "{{ .Values.app.custom.deployment.name }}"
{{/*
app.kubernetes.io/component: "{{ .Values.app.custom.deployment.image.repository }}"
app.kubernetes.io/version: "{{ .Values.app.custom.deployment.image.tag }}"
*/}}
{{- end }}
{{- define "creators-hub-app.custom.container.labels" -}}
{{- include "creators-hub-app.custom.deployment.labels" . }}
{{- end -}}
{{- define "creators-hub-app.custom.deployment.matchLabels" -}}
{{- include "creators-hub-app.custom.container.labels" . }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "creators-hub-app.app.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
    {{- if .Values.serviceAccount.name }}
        {{- default .Values.serviceAccount.name }}
    {{- else }}
         {{- default .Values.app.name }}
    {{- end }}
{{- else }}
    {{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- $serviceNamespace := .Values.serviceNamespace -}}
{{- $serviceTag := .Values.serviceTag -}}
{{- if $serviceTag}}
{{- $serviceNamespace = print .Values.serviceNamespace  "-" .Values.serviceTag -}}
{{- end}}
