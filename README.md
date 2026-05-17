# Apex Engine

A software 3D rendering engine built in plain JavaScript. The engine currently implements 3D wireframe rendering on a 2D HTML Canvas, wrapped in a retro terminal-styled dashboard for visualizing engine metrics and performance.

## Core Concepts & Mathematics

The engine avoids WebGL and external libraries by relying purely on mathematical transformations to project 3D coordinate space onto a 2D plane. 

### 1. Rotation (Euler Angles)
To rotate 3D vertices, we apply standard 2D rotation matrices to the respective planes.

Rotation around the Y-axis (XZ Plane):
```
x' = x * cos(theta) - z * sin(theta)
z' = x * sin(theta) + z * cos(theta)
```

Rotation around the X-axis (YZ Plane):
```
y' = y * cos(theta) - z * sin(theta)
z' = y * sin(theta) + z * cos(theta)
```

Rotation around the Z-axis (XY Plane):
```
x' = x * cos(theta) - y * sin(theta)
y' = x * sin(theta) + y * cos(theta)
```

### 2. Translation
Vertices are shifted along the Z-axis by a static distance (dz) to position the 3D model in front of the viewer's projection plane.
```
z' = z + dz
```

### 3. Perspective Projection
To create the illusion of 3D depth, the X and Y coordinates are divided by their distance along the Z-axis. This causes points further away to appear closer to the origin (the center of the screen).
```
x_proj = x / z
y_proj = y / z
```

### 4. Screen Mapping
The projected normalized device coordinates (-1 to 1) are finally scaled and mapped to fit the dimensions of the HTML5 Canvas element.

## Usage
Serve the root directory on a local HTTP server and open index.html to view the dashboard.

## Credits
The fundamental math and initial renderer logic are heavily inspired by Tsoding:
https://www.youtube.com/watch?v=qjWkNZ0SXfo&t=232s
