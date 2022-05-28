from main.models import Candidate
from django.contrib import admin
from django.utils.translation import ugettext_lazy as _


class CandidateAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'primary_role', 'status')
    list_filter = ('status', 'primary_role')
    readonly_fields = ('updated_at', 'created_at',)
    fieldsets = (
        (_('About'), {'fields': ('first_name', 'last_name', 'primary_role', 'education', 'experience', 'bio')}),
        (_('Contact Info'), {'fields': ('email', 'phone', 'adress', 'city', 'state', 'zipcode', 'country')}),
        (_('Social Profiles'), {'fields': ('website', 'linkedln', 'github')}),
        (_('Work Experience'), {'fields': ('projects', 'skills')}),
        (_('Metadata'), {'fields': ('resume', 'status', 'updated_at', 'created_at')}),
    )


admin.site.register(Candidate, CandidateAdmin)
