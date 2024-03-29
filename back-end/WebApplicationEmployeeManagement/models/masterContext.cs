﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebApplicationEmployeeManagement.Models
{
    public partial class masterContext : DbContext
    {
        public masterContext()
        {
        }

        public masterContext(DbContextOptions<masterContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DetailsEmployee> DetailsEmployees { get; set; }
        public virtual DbSet<LeaveRequestEmployee> LeaveRequestEmployees { get; set; }
        public virtual DbSet<ReportEmployee> ReportEmployees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DetailsEmployee>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__DetailsE__7AD04F111A34DF26");

                entity.ToTable("DetailsEmployee");

                entity.Property(e => e.EmployeeId).ValueGeneratedNever();

                entity.Property(e => e.EmployeeDepartment)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeOrManager)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeePassword)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeStartDate)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.EmployeeSurname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LeaveRequestEmployee>(entity =>
            {
                entity.HasKey(e => e.LeaveRequestId)
                    .HasName("PK__LeaveReq__609421EE22CA2527");

                entity.Property(e => e.LeaveRequestId).ValueGeneratedNever();

                entity.Property(e => e.LeaveDate).HasColumnType("date");

                entity.Property(e => e.LeaveReason)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.SubmissionDate).HasColumnType("date");
            });

            modelBuilder.Entity<ReportEmployee>(entity =>
            {
                entity.HasKey(e => e.ReportId)
                    .HasName("PK__ReportEm__D5BD48051EF99443");

                entity.Property(e => e.ReportId).ValueGeneratedNever();

                entity.Property(e => e.ManagerReport).IsRequired();

                entity.Property(e => e.ReportDate).HasColumnType("date");

                entity.Property(e => e.TaskWorkedOn)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}