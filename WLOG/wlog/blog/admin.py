from django.contrib import admin
from .models import Post, Product, Page

#We will modify the default list-views of the Django Admin to show some extra fields
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'sku', 'link')

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')

admin.site.register(Page, PageAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Post, PostAdmin)