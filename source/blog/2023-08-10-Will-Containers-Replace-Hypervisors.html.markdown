---
title: Will Containers Replace Hypervisors? Almost Certainly
date: 2023-08-10 10:16 UTC
tags:  Container, Cloud
imageUrl: /assets/images/hypervisorvscontainer.jpeg
description: The prospect of containers replacing hypervisors such as VMware ESX or Linux KVM deployment interest to many.
---

## Will Containers Replace Hypervisors? Almost Certainly!

<figure class="blog__image">
   <img src="/assets/images/hypervisorvscontainer.jpeg" alt="Hypervisor" >
</figure>

After OpenStack, the number one topic that I get asked about these days is containers and their prospects for the enterprise and cloud-native applications. The prospect of containers replacing hypervisors such as VMware ESX or Linux KVM (the default for most OpenStack deployments) is of keen interest to many. Yet, there is confusion. Many people can’t distinguish the difference between containers and VMs. Still others like to wave the security boogeyman in favor of VMs, believing that containers can’t be secure. Lost in all of this is a proper understanding of not only what a container is at the infrastructure layer, but also what it can be in the future with relatively trivial updates. Also lost is an understanding of the value of traditional hypervisors such as VMware ESX, which is rapidly fading. From my perspective the day of the VM is fading and it’s only a question of how fast the change occurs.Containers as Infrastructure vs. Containers as Application-centric Packaging and Management Tools Perhaps I will talk more about this in future, but it’s important to understand that, unlike VMs, containers have a dual lens you can view them through: are they infrastructure (aka “lightweight VMs”) or are they application management and configuration systems? The reality is that they are both. If you are an infrastructure person you likely see them as the former and if a developer you likely see them as the latter.

### When Hypervisors Died
The death knell of the hypervisor was sounded when Intel provided much of the unique capabilities of the hypervisor directly in the chip via the Intel-VTx instruction set. Prior to this, VMware and Xen had two unique approaches to providing hypervisor capabilities: binary translation and paravirtualization respectively. Arguments raged about which was faster, but once Intel-VTx came along, by virtue of being on the chip die, it was the de facto speed winner. After that, VMware ESX and Xen both used Intel-VTx by default. This also allowed the creation of KVM which depends 100% on the Intel-VTx chipset for these capabilities. Perhaps most importantly, it negated most of the differences between “type-1” and “type-2” hypervisors.Now, of course, you could argue, that hypervisors still provide value, but this value is not what it was and is primarily focused around providing support for legacy applications in heterogeneous environments. In effect, a hypervisor allows you to run differing operating systems within your guest systems (VMs).

### The Paravirtualization Driver Layer in Hypervisors
Once Intel-VTx came about, the big problem for managing existing legacy “pet” workloads was supporting a wide variety of operating systems. This is what exists in enterprise environments today and support for heterogeneous environments is critical to supporting them. Unfortunately, while you can run an unmodified kernel on Intel-VTx, system calls that touch networking and disk still wind up hitting emulated hardware. Intel-VTx primarily solved the issues of segregating, isolating, and allowing high performance access to direct CPU calls and memory access (via Extended Page Table [EPT]). Intel-VT does not solve access to network and disk, although SR-IOV, VT-d, and related attempted to address this issue, but never quite got there.

In order to eke out better performance from networking and disk, all of the major hypervisors turn to paravirtualized drivers. Paravirtualized drivers are very similar to Xen’s paravirtualized kernels. Within the hypervisor and it’s guest operating system there is a special paravirtualization driver for the network or disk. You can think of this driver as being “split” between the hypervisor kernel and the guest kernel, allowing greater throughput.
Still, performance hits for networking and disk can be anywhere from 5-30% depending on workloads. Paravirtualized drivers simply can’t operate like bare metal.

The Homogenization of the Enterprise Datacenter Means Containers Win Ultimately
As we move towards cloud native applications and the third platform, we are all keenly aware of the need to standardize and normalize the underlying operating systems. You can’t get greater operational efficiency if you are running 20 different operating systems. If you desire containers, then you are also looking at running them on homogeneous or mostly homogeneous environments. If you are moving to any kind of PaaS platform, you are standardizing the underlying operating systems. Everywhere you look, we’re moving away from heterogeneity

### Containers and Security
It’s a popular refrain to talk about containers as being “less secure” than hypervisors, despite the fact that for some of us, containers were originally conceived as an application security mechanism. They allow packaging up an application into a very low attack surface, running it as an unprivileged user, in an isolated jail![4] That’s far better than a typical VM-based approach where you lug along most of an operating system that has to be patched and maintained regularly.But many will point to the magic voodoo that a hypervisor can do to provide isolation, such as Extended Page Table (EPT). Yet, EPT, and many other capabilities in the hypervisor are no longer provided by the hypervisor itself, but by the Intel-VTx instruction set. And there is nothing special that keeps the Linux kernel from calling those instructions. In fact, there is already code out of Stanford from the DUNE project that does just this for regular applications. Integrating it to container platforms would be trivial.

### Containers and Resiliency
We then must ask the question: “what about DRS and HA?” Taking aside the fact that these capabilities are largely about supporting pet workloads and that containers don’t play in this world, the reality is that DRS and HA are largely unnecessary in an elastic third platform world. Platform-as-a-Service (PaaS) tools like Cloud Foundry, container management systems like Kubernetes, Rancher, Mesos, and similar management tools are already designed to dynamically scale your workloads. They detect performance and failure issues within your running application and take proactive steps to deal with them.

This then leads us to understand that hypervisors sole value resides primarily around supporting many operating systems using PV drivers, something that is not a requirement in the next generation datacenter.
