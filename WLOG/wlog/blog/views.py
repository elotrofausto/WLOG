from django.shortcuts import render

from django.views import generic
from .models import Post, Page, Product

class PostList(generic.ListView):
    queryset = Post.objects.filter(status=1).order_by('-date_created')
    template_name = 'index.html'

class PostDetail(generic.DetailView):
    model = Post
    template_name = 'post_detail.html'

class PageDetail(generic.DetailView):
    model = Page
    template_name = 'page_detail.html'

class ProductList(generic.ListView):
    queryset = Product.objects.all()
    template_name = 'product_list.html'

class ProductDetail(generic.DetailView):
    model = Product
    template_name = 'product_detail.html'