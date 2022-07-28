//wait, so I got a lattice. 
//This is not helpful at the moment: maybe instead
//first simulate the reflection, glide reflection, translation, rotation code?
//maybe instead matrix multiplication?? to get new points
//that should be done in python
const canva_size = 750
const lattice = 2
const num = 1
const groupNames = ["p1", "p2", "pm", "pg", "cm", "pmm", "pmg", "pgg", "cmm", "p4", "p4m", "p4g", "p3", "p3m1", "p31m", "p6", "p6m"]
var base = []

function setup() {
  // put setup code here
  createCanvas(canva_size, canva_size);
  background(250);
   
  base = latticeBase()
  const points = grid(base[0], base[1])
  isometries(points)
}

function draw() {
  if (mouseIsPressed) {
    fill(0)
    // point(mouseX, mouseY)
    if (num == 0) {
      wallpaper0()
    }
    else if (num == 1) {
      let v0 = base[1].copy()
      v0.sub(base[0]) 
      print(v0)
      wallpaper1(v0)
    }
  }
}

function latticeBase() {
  let i = createVector(0, 0)
  let j = createVector(0, 0)
  if (lattice == 0) {
    //oblique
    i = createVector(50, 0)
    j = createVector(10, 50)
  }
  else if (lattice == 1) {
    //rect
    i = createVector(50, 0)
    j = createVector(0, 30)
  }
  else if (lattice == 2) {
    //sq
    i = createVector(50, 0)
    j = createVector(0, 50)
  }
  else if (lattice == 3) {
    //rhombic
    i = createVector(43.3, -25)
    j = createVector(0, 50)
  }
  else if (lattice == 4) {
    //hexagonal
    i = createVector(50, 0)
    j = createVector(28.9, 50)
    
  }

  return [i, j]
}

function grid(i, j) {
  stroke('purple')
  strokeWeight(3)
  let i2 = createVector(i.x, i.y)
  let j2 = createVector(-1 * j.x, -1 * j.y)

  let points = [[]]

  while (i2.x <= canva_size) {
    
    while (i2.y <= canva_size) {
      i2 = i2.add(j)
      triangle(i2.x, i2.y, i2.x + 1, i2.y, i2.x, i2.y - 1)
      points.push([i2.x, i2.y])
    }

    i2 = i2.add(i)

    while (i2.y >= 0) {
      i2 = i2.add(j2)
      triangle(i2.x, i2.y, i2.x + 1, i2.y, i2.x, i2.y - 1)
      points.push([i2.x, i2.y])
    }

    i2 = i2.add(i)
  }
  return points
}

function isometries(vecs = []) {
  //num = 0 - do nothing
  if (num == 1) {
    let v0 = createVector(-40, 50)
    for (let i = 0; i < vecs.length; i++) {
      // let a = 180
      // let changeV = createVector(vecs[i][0] * sin(a) * cos(a), )
      // triangle(changeV.x, changeV.y, changeV.x - 1, changeV.y, changeV.x, changeV.y + 1)
      let changeV = createVector(vecs[i][0], vecs[i][1])
      //vecs[i][0] - 50 makes something diff :)
      changeV.reflect(v0) 
      //point(changeV.x, changeV.y)
      triangle(changeV.x-4, changeV.y+4, changeV.x - 5, changeV.y+4, changeV.x-4, changeV.y + 5)
    }
  }
}

function wallpaper0() {
  //n = 0
 
  let mouseP = [pmouseX, pmouseY]
  point(pmouseX, pmouseY)
  while (mouseP[0] < canva_size) {
    while (mouseP[1] < canva_size) {
      mouseP[1] += 50
      point(mouseP[0], mouseP[1])
      
    }
    mouseP[1] = pmouseY
    while (mouseP[1] >= 0) {
      mouseP[1] -= 50
      point(mouseP[0], mouseP[1])
    }
    mouseP[0] += 50
  }
  mouseP[0] = pmouseX
  while (mouseP[0] > 0) {
    while (mouseP[1] < canva_size) {
      mouseP[1] += 50
      point(mouseP[0], mouseP[1])
      
    }
    mouseP[1] = pmouseY
    while (mouseP[1] >= 0) {
      mouseP[1] -= 50
      point(mouseP[0], mouseP[1])
    }
    mouseP[0] -= 50
  }

}


function wallpaper1(v0) {
  //n = 1
  //should actually be i j diff
  //let v0 = createVector(-40, 50)
  let mouseP = [pmouseX, pmouseY]
  point(pmouseX, pmouseY)
  while (mouseP[0] < canva_size) {
    while (mouseP[1] < canva_size) {
      mouseP[1] += 50
      isometries2([mouseP[0], mouseP[1]], v0)
      
    }
    mouseP[1] = pmouseY
    while (mouseP[1] >= 0) {
      mouseP[1] -= 50
      isometries2([mouseP[0], mouseP[1]], v0)
    }
    mouseP[0] += 50
  }
  mouseP[0] = pmouseX
  while (mouseP[0] > 0) {
    while (mouseP[1] < canva_size) {
      mouseP[1] += 50
      isometries2([mouseP[0], mouseP[1]], v0)
      
    }
    mouseP[1] = pmouseY
    while (mouseP[1] >= 0) {
      mouseP[1] -= 50
      isometries2([mouseP[0], mouseP[1]], v0)
    }
    mouseP[0] -= 50
  }

}

function isometries2(vecs = [], v0) {
    let changeV = createVector(vecs[0], vecs[1])
    point(changeV.x, changeV.y)
    changeV.reflect(v0)
    point(changeV.x, changeV.y)
}

// function translate(x=createVector(0,0), a=createVector(50, 0)) {
//   return x.add(a)
// }

// function rotate(a=0, p = Math.matrix[0, 0]) {
//   const rotateMatri = Math.matrix([Math.cos(a), -1 * Math.sin(a)], [Math.sin(a), Math.cos(a)])
//   return Math.multiply(p, rotateMatri)
// }

// function reflect(a=0, p = Math.matrix[0, 0]) {
//   a *= 2;
//   const rotateMatri = Math.matrix([Math.cos(a), -1 * Math.sin(a)], [Math.sin(a), Math.cos(a)])
//   return Math.multiply(p, rotateMatri)
// }

// function glideRefl(angle, init_vec) {
//   init_vec = reflect(angle, init_vec)
//   a = createVector(Math.sin(angle) * 50, Math.sin(angle) * 50)
  
// }

//maybe define vector space

    //ellipse(mouseX, mouseY, 10, 10)
    //reflect, rotate, translate - exist
    //glide reflec - does not 
    //maybe first code with triangles

// function reflection(x, y) {
//   if (x > 200) {
//     x -= 200;
//   }
//   ellipse(x, y, 10, 10)
//   ellipse(x + 200, y, 10, 10)
// }

//use vectors
