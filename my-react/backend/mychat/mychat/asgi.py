"""
ASGI config for mychat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mychat.settings')

# application = get_asgi_application()
# import os  
# from django.core.asgi import get_asgi_application  
# from channels.routing import ProtocolTypeRouter, URLRouter   # type: ignore
# from channels.auth import AuthMiddlewareStack   # type: ignore
# from chat import routing  
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mychat.settings')  

# application = ProtocolTypeRouter({  
#     "http": get_asgi_application(),  
#     "websocket": AuthMiddlewareStack(  
#         URLRouter(  
#             routing.websocket_urlpatterns  
#         )  
#     ),  
# })

from channels.routing import ProtocolTypeRouter, URLRouter  
from channels.auth import AuthMiddlewareStack  
from blog.chat import routing  # Переконайтеся, що правильний шлях до routing.py  

application = ProtocolTypeRouter({  
    ...  
    "websocket": AuthMiddlewareStack(  
        URLRouter(  
            routing.websocket_urlpatterns  # Ваші URL-шляхи для WebSocket тут  
        )  
    ),  
}) 