---

title: Mountpoint for Amazon S3
date: 2023-08-10 09:07 UTC
tags: Mountpoints, Cloud
imageUrl: /assets/images/cloud.jpg
description: "Mountpoint is an open source file client that makes it easy for your to connect directly to buckets"
---
## Mountpoint for Amazon S3 – Generally Available and Ready for Production Workloads

<figure class="blog__image">
   <img src="/assets/images/cloud.jpg" alt="cloud" >
</figure>

Mountpoint for Amazon S3 is an open source file client that makes it easy for your file-aware Linux applications to connect directly to Amazon Simple Storage Service (Amazon S3) buckets. Announced earlier this year as an alpha release, it is now generally available and ready for production use on your large-scale read-heavy applications: data lakes, machine learning training, image rendering, autonomous vehicle simulation, ETL, and more. It supports file-based workloads that perform sequential and random reads, sequential (append only) writes, and that don’t need full POSIX semantics.

### Why Files?
Many AWS customers use the S3 APIs and the AWS SDKs to build applications that can list, access, and process the contents of an S3 bucket. However, many customers have existing applications, commands, tools, and workflows that know how to access files in UNIX style: reading directories, opening & reading existing files, and creating & writing new ones. These customers have asked us for an official, enterprise-ready client that supports performant access to S3 at scale. After speaking with these customers and asking lots of questions, we learned that performance and stability were their primary concerns, and that POSIX compliance was not a necessity.

When I first wrote about Amazon S3 back in 2006 I was very clear that it was intended to be used as an object store, not as a file system. While you would not want use the Mountpoint / S3 combo to store your Git repositories or the like, using it in conjunction with tools that can read and write files, while taking advantage of S3’s scale and durability, makes sense in many situations.

### All About Mountpoint
Mountpoint is conceptually very simple. You create a mount point and mount an Amazon S3 bucket (or a path within a bucket) at the mount point, and then access the bucket using shell commands (ls, cat, dd, find, and so forth), library functions (open, close, read, write, creat, opendir, and so forth) or equivalent commands and functions as supported in the tools and languages that you already use.

Under the covers, the Linux Virtual Filesystem (VFS) translates these operations into calls to Mountpoint, which in turns translates them into calls to S3: LIST, GET, PUT, and so forth. Mountpoint strives to make good use of network bandwidth, increasing throughput and allowing you to reduce your compute costs by getting more work done in less time.

Mountpoint can be used from an Amazon Elastic Compute Cloud (Amazon EC2) instance, or within an Amazon Elastic Container Service (Amazon ECS) or Amazon Elastic Kubernetes Service (EKS) container. It can also be installed on your existing on-premises systems, with access to S3 either directly or over an AWS Direct Connect connection via AWS PrivateLink for Amazon S3.

### Installing and Using Mountpoint for Amazon S3
Mountpoint is available in RPM format and can easily be installed on an EC2 instance running Amazon Linux. I simply fetch the RPM and install it using yum:

$ wget https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.rpm
$ sudo yum install ./mount-s3.rpm
