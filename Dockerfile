FROM debian:bookworm-slim AS builder
ARG TARGETARCH
ARG CALIBRE_VERSION=9.8.0

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates wget xz-utils \
    && rm -rf /var/lib/apt/lists/*

RUN case "$TARGETARCH" in \
    amd64) ARCH=x86_64 ;; \
    arm64) ARCH=arm64 ;; \
    *) echo "Unsupported arch: $TARGETARCH" && exit 1 ;; \
    esac && \
    wget -nv -O /tmp/calibre.txz \
      "https://github.com/kovidgoyal/calibre/releases/download/v${CALIBRE_VERSION}/calibre-${CALIBRE_VERSION}-${ARCH}.txz" && \
    mkdir -p /opt/calibre && \
    tar -xJf /tmp/calibre.txz -C /opt/calibre

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /opt/calibre /opt/calibre

ENV PATH="/opt/calibre:$PATH"
VOLUME /library
VOLUME /config
EXPOSE 8080
ENTRYPOINT ["/opt/calibre/calibre-server"]
