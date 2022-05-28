from django.db import models

PRIMARY_ROLE_CHOICES = (
    ('full-stack-engineer', 'Full-Stack Engineer'),
    ('frontend-engineer', 'Frontend Engineer'),
    ('backend-engineer', 'Backend Engineer'),
    ('devops-engineer', 'DevOps Engineer'),
    ('mobile-developer', 'Mobile Developer'),
    ('data-engineer', 'Data Engineer'),
    ('data-scientist', 'Data Scientist'),
)

STATUS_CHOICES = (
    ("applied", "Applied"),
    ("accepted", "Accepted"),
    ("rejected", "Rejected"),
)


class Candidate(models.Model):
    # About section
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    primary_role = models.CharField(max_length=50, choices=PRIMARY_ROLE_CHOICES, default='full-stack-engineer')
    experience = models.CharField(max_length=500)
    education = models.CharField(max_length=100)
    bio = models.TextField(max_length=200, blank=True)

    # Contact Info
    email = models.EmailField(max_length=100, unique=True)
    phone = models.CharField(max_length=15)
    adress = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=10)
    country = models.CharField(max_length=100)

    # Social Profiles
    website = models.URLField(max_length=1000, blank=True)
    linkedln = models.URLField(max_length=1000, blank=True)
    github = models.URLField(max_length=1000, blank=True)

    # Work Experience
    projects = models.TextField(blank=True)
    skills = models.TextField(help_text="Enter your skills, separated by comma.", max_length=1024, blank=True, null=True, default=None)

    # Metadata
    resume = models.FileField(upload_to='uploads/resume/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='applied')

    def __str__(self):
        return self.first_name
