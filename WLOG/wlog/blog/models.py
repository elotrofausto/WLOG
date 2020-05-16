from django.db import models
from django.contrib.auth.models import User

STATUS = (
    (0, "Draft"),
    (1, "Published")
)

class Page(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True) #friendly-url
    image = models.ImageField(upload_to='img')
    text = models.TextField()

    def __str__(self):
        return self.title

    def get_cname(self):
        class_name = "Page"
        return class_name 

class Product(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    sku = models.CharField(max_length=13, unique=False)
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='products')
    image = models.ImageField(upload_to='img')
    description = models.TextField()
    short_description = models.TextField(max_length=50)
    link = models.URLField(max_length=200)
    date_published = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def get_cname(self):
        class_name = "Product"
        return class_name 

class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    image = models.ImageField(upload_to='img', blank=True, null=True) #allows null
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='blog_posts')
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    status = models.IntegerField(choices=STATUS, default=0)
    related_product = models.ForeignKey(Product, on_delete=models.DO_NOTHING, blank=True, null=True) #allows null

    def __str__(self):
        return self.title

    def get_cname(self):
        class_name = "Post"
        return class_name 