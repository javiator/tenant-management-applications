from flask import Blueprint, send_from_directory, current_app
from pathlib import Path

swagger_bp = Blueprint('swagger', __name__, url_prefix='/docs')

# Serve a minimal Swagger UI using the official CDN
INDEX_HTML = """
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Swagger UI</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
    <script>
      window.addEventListener('load', () => {
        SwaggerUIBundle({
          url: '/openapi.yaml',
          dom_id: '#swagger-ui',
        });
      });
    </script>
  </body>
</html>
"""

@swagger_bp.route('/')
def swagger_index():
  return INDEX_HTML
