from .views import PostList, PostDetail, PageDetail, ProductDetail, ProductList
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', PostList.as_view(), name='home'),
    path('blog/', PostList.as_view(), name='home'),
    path('product/', ProductList.as_view(), name='product_list'),
    path('blog/<slug:slug>/', PostDetail.as_view(), name='post_detail'),
    path('page/<slug:slug>/', PageDetail.as_view(), name='page_detail'),
    path('product/<slug:slug>/', ProductDetail.as_view(), name='product_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)