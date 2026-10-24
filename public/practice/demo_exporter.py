"""Local synthetic metrics for studying collection; no database connection."""
import argparse
import time
from http.server import BaseHTTPRequestHandler, HTTPServer

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=9108)
parser.add_argument('--connections', type=int, default=27)
args = parser.parse_args()
if args.connections < 0:
    parser.error('--connections must be non-negative')
started = time.monotonic()

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path != '/metrics':
            self.send_error(404)
            return
        attempts = 2 * int(time.monotonic() - started)
        body = (
            '# HELP demo_db_active_connections Synthetic current connections.\n'
            '# TYPE demo_db_active_connections gauge\n'
            f'demo_db_active_connections{{env="training"}} {args.connections}\n'
            '# HELP demo_db_connection_attempts_total Synthetic connection attempts.\n'
            '# TYPE demo_db_connection_attempts_total counter\n'
            f'demo_db_connection_attempts_total{{env="training"}} {attempts}\n'
            '# HELP demo_db_probe_duration_seconds Synthetic probe duration in seconds.\n'
            '# TYPE demo_db_probe_duration_seconds gauge\n'
            'demo_db_probe_duration_seconds{env="training"} 0.025\n'
            '# HELP demo_volume_free_bytes Synthetic free space on training volume.\n'
            '# TYPE demo_volume_free_bytes gauge\n'
            'demo_volume_free_bytes{mount="/data",env="training"} 2147483648\n'
        ).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *values):
        pass

print(f'Synthetic metrics: http://127.0.0.1:{args.port}/metrics', flush=True)
try:
    HTTPServer(('127.0.0.1', args.port), Handler).serve_forever()
except KeyboardInterrupt:
    pass
