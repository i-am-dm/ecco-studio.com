# Prepared context-filter probe, not the application build recipe.
# Supply the already-built Studio image; use a disposable source-export copy.
ARG VALIDATED_IMAGE
FROM ${VALIDATED_IMAGE} AS context-filter-check
WORKDIR /context-filter
COPY . .
RUN test -s package.json \
    && test -s package-lock.json \
    && test -s server.js \
    && test -s scripts/check-system-ca.mjs \
    && test -s validation-data/settings.json \
    && test ! -e gha-creds-validation.json \
    && test ! -e application_default_credentials.json \
    && test ! -e validation-data/gha-creds-validation.json \
    && test ! -e validation-data/application_default_credentials.json
