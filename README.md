# 🛰️ Leveraging Google Earth Engine for Karnataka LULC Mapping 
### 🤖 Machine Learning (Random Forest) & Geospatial Big Data Analysis

## 📌 Project Overview
This project presents a comprehensive approach to multi-temporal Land Use and Land Cover (LULC) classification for the state of Karnataka. [cite_start]By harnessing the cloud-based computational power of **Google Earth Engine (GEE)**, this study analyzes landscape dynamics over a 10-year period (2013, 2017, 2021, and 2024). [cite: 2162, 2163]

## 🎯 Key Objectives
* [cite_start]**Large-Scale Analysis:** Map LULC across the entire state of Karnataka (~191,791 km²). 
* [cite_start]**Temporal Dynamics:** Identify spatial-temporal changes in urban expansion and forest cover. [cite: 2163]
* [cite_start]**Machine Learning:** Implement a robust Random Forest classifier for high-accuracy results. [cite: 2166]

## 🛠️ Tech Stack & Data
* [cite_start]**Platform:** Google Earth Engine (GEE) [cite: 2162]
* [cite_start]**Algorithm:** Random Forest (RF) Machine Learning Classifier [cite: 2162]
* [cite_start]**Data Sources:** Landsat 8 (Level 2 Surface Reflectance) & Sentinel-2 MSI [cite: 2164]
* [cite_start]**Spectral Indices:** NDVI (Vegetation), NDWI (Water), and NDBI (Built-up) [cite: 2383]

## 📊 Methodology
1.  [cite_start]**Data Acquisition:** Filtered multi-petabyte satellite archives for cloud-free (<20%) annual composites. [cite: 2364, 2366]
2.  [cite_start]**Preprocessing:** Cloud masking, median mosaicking, and spectral feature extraction. [cite: 2164]
3.  [cite_start]**Classification:** Stratified sampling for 5 major classes: Built-up, Vegetation, Waterbody, Barren Land, and Agriculture. [cite: 2165]
4.  [cite_start]**Validation:** Accuracy assessment using confusion matrices, Overall Accuracy (OA), and Kappa Coefficient. 

## 📐 The Formula
The Normalized Difference Vegetation Index (NDVI) was used to enhance class separability:
[cite_start]$$NDVI = \frac{NIR - Red}{NIR + Red}$$ 

## 📈 Key Insights (2013 - 2024)
* [cite_start]**Urban Sprawl:** Significant increase in built-up areas, particularly surrounding clusters like Bengaluru and Mysuru. [cite: 2169, 2182]
* [cite_start]**Ecological Shifts:** Identifiable reduction in forest cover and agricultural land due to infrastructural development. [cite: 2169]

## 📂 Repository Contents
* `/reports`: Full Major Project technical report.
* `/maps`: Multi-temporal LULC maps showing Karnataka's landscape evolution.
* `/scripts`: Google Earth Engine JavaScript classification code.

---
## 👨‍💻 Author
**Prajwal Patil GM** *REVA University, School of ECE*
