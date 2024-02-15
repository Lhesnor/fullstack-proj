from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("images", "0004_alter_profile_premium"),
    ]

    operations = [
        migrations.AlterField(
            model_name="image",
            name="created",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name="profile",
            name="created",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
