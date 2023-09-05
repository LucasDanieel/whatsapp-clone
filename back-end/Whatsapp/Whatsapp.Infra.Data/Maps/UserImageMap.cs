using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Whatsapp.Domain.Entities;

namespace Whatsapp.Infra.Data.Maps
{
    public class UserImageMap : IEntityTypeConfiguration<UserImage>
    {
        public void Configure(EntityTypeBuilder<UserImage> builder)
        {
            builder.ToTable("User_Image");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .IsRequired()
                .HasColumnName("Id")
                .UseIdentityColumn();

            builder.Property(x => x.UserId)
                .IsRequired()
                .HasColumnName("User_Id");

            builder.Property(x => x.ImageUrl)
                .HasColumnName("Image_Url");

            builder.Property(x => x.PublicId)
                .HasColumnName("Public_Id");

        }
    }
}
