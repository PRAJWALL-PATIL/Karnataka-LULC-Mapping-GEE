/**
 * Project: Leveraging Google Earth Engine for Karnataka Land Use Mapping
 * Author: Prajwal Patil GM
 * Algorithm: Random Forest Classifier
 */

// 1. Define Study Area (ROI)
var karnataka = ee.FeatureCollection("projects/google/karnataka_boundary"); // Replace with your asset path
Map.centerObject(karnataka, 7);
Map.addLayer(karnataka, {color: 'black'}, 'Karnataka Boundary', false);

// 2. Load and Filter Landsat 8 Satellite Imagery
var imageCollection = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
  .filterBounds(karnataka)
  .filterDate('2024-01-01', '2024-12-31') // Adjust dates as per project years (2013, 2017, 2021, 2024)
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

// 3. Preprocessing: Median Composite and Clipping
var composite = imageCollection.median().clip(karnataka);

// 4. Feature Engineering: Spectral Indices Calculation
var ndvi = composite.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI'); // Vegetation Index
var ndwi = composite.normalizedDifference(['SR_B3', 'SR_B5']).rename('NDWI'); // Water Index
var ndbi = composite.normalizedDifference(['SR_B6', 'SR_B5']).rename('NDBI'); // Built-up Index

// Add indices as bands to the composite
var finalImage = composite.addBands([ndvi, ndwi, ndbi]);

// 5. Training Data Preparation
// These variables (Urban, Vegetation, etc.) should be your imported FeatureCollections (points)
var trainingPoints = urban.merge(vegetation).merge(waterbody).merge(barrenland).merge(agriculture);

var trainingData = finalImage.sampleRegions({
  collection: trainingPoints,
  properties: ['Class'], // Ensure your points have a 'Class' property (0, 1, 2, 3, 4)
  scale: 30
});

// 6. Dataset Splitting (80% Training, 20% Testing)
var withRandom = trainingData.randomColumn('random');
var trainSet = withRandom.filter(ee.Filter.lt('random', 0.8));
var testSet = withRandom.filter(ee.Filter.gte('random', 0.8));

// 7. Random Forest Classification
var rfModel = ee.Classifier.smileRandomForest(50).train({
  features: trainSet,
  classProperty: 'Class',
  inputProperties: finalImage.bandNames()
});

var classified = finalImage.classify(rfModel);

// 8. Result Visualization
var palette = [
  'red',    // 0: Built-up
  'green',  // 1: Vegetation
  'blue',   // 2: Waterbody
  'yellow', // 3: Barrenland
  'brown'   // 4: Agriculture
];

Map.addLayer(classified, {min: 0, max: 4, palette: palette}, 'LULC Classification 2024');

// 9. Accuracy Assessment (The "Data Scientist" part)
var validated = testSet.classify(rfModel);
var errorMatrix = validated.errorMatrix('Class', 'classification');

print('Confusion Matrix:', errorMatrix);
print('Overall Accuracy:', errorMatrix.accuracy());
print('Kappa Coefficient:', errorMatrix.kappa());

// 10. Export to Drive for Documentation
Export.image.toDrive({
  image: classified,
  description: 'Karnataka_LULC_2024',
  scale: 30,
  region: karnataka,
  maxPixels: 1e13
});
