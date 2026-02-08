from django.urls import path
from . import views

urlpatterns = [
    path("site/", views.site_settings),
    path("pages/", views.pages),
    path("services/", views.services),
    path("services/<slug:slug>/", views.service_detail),
    path("projects/", views.projects),
    path("projects/<slug:slug>/", views.project_detail),
    path("blog/", views.blog_list),
    path("blog/<slug:slug>/", views.blog_detail),
    path("testimonials/", views.testimonials),
    path("contact/", views.contact),
]
