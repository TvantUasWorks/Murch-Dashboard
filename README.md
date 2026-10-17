# TVANT- MURCH CLIENT PORTAL 

Versión de demostración para GitHub Pages, basada en el prototipo local TVANT. **Los datos son ficticios y no hay autenticación.**

## Publicar desde el navegador

1. En [github.com/new](https://github.com/new), crea un repositorio público `tvant-client-portal-demo`.
2. En el repositorio, pulsa **Add file → Upload files** y sube `index.html` y `.nojekyll` (si el explorador oculta `.nojekyll`, no es imprescindible para esta página HTML simple).
3. Confirma los cambios en la rama `main`.
4. En **Settings → Pages**, selecciona **Deploy from a branch**, rama **main**, carpeta **/(root)** y pulsa **Save**.
5. Abre la URL que aparezca en **Settings → Pages**. Normalmente `https://TU-USUARIO.github.io/tvant-client-portal-demo/`.

## Seguridad

- GitHub Pages estándar es público. No publiques PDF, JSON, imágenes, medidas eléctricas ni información interna de MURCH/GREENSOL.
- La contraseña en JavaScript no convierte GitHub Pages en una web privada.
- Esta demo **no** conecta con TVANT SUPERVISOR Windows ni publica actualizaciones.
- Para el futuro portal privado, usar un servidor/autenticación real y control de permisos por proyecto.

## Evolución

Tras confirmar la demo, se puede preparar un sistema de publicación manual para datos expresamente autorizados o integrar un backend privado para clientes.
