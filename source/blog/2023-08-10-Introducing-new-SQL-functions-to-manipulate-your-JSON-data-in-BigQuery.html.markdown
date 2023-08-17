---
title: Introducing new SQL functions to manipulate your JSON data in BigQuery
date: 2023-08-10 09:13 UTC
tags: BigQuery, Cloud
imageUrl: /assets/images/gcp.jpg
description: Introducing new SQL functions to manipulate your JSON data in BigQuery
---

## Introducing new SQL functions to manipulate your JSON data in BigQuery

<figure class="blog__image">
   <img src=" /assets/images/gcp.jpg" alt="Hypervisor" >
</figure>

Enterprises are generating data at an exponential rate, spanning traditional structured transactional data, semi-structured like JSON and unstructured data like images and audio. Beyond the scale of the data, these divergent types present processing challenges for developers, at times requiring separate processing flows for each. With its initial release BigQuery’s support for semi-structured JSON eliminated the need for such complex preprocessing and providing schema flexibility, intuitive querying and the scalability benefits afforded to structured data.

Today, we are excited to announce the release of new SQL functions for BigQuery JSON, extending the power and flexibility of our core JSON support. These functions make it even easier to extract and construct JSON data and perform complex data analysis.

With these new query functions, you can:

- Convert JSON values into primitive types (INT64, FLOAT64, BOOL and STRING) in an easier and more flexible way with the new JSON LAX functions.
- Easily update and modify an existing JSON value in BigQuery  with the new JSON  mutator functions.
- Construct JSON object and JSON array with SQL in BigQuery with the new JSON constructor functions.
