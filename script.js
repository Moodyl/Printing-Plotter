    
    let capture;
    
    let stepSize = 10;
    
    let shape = ["line", "line", "line"];

    function pickShape(num, a){
        shape[num] = a;
    }

    let output = document.getElementById('stepSize-output').innerHTML;


    function setup() {

        const canva = createCanvas(800, 800 / (16 / 9));

        canva.parent('sketch-container');

        capture = createCapture(VIDEO);
        capture.size(canva.width, canva.height);
        capture.hide();

        strokeCap(PROJECT)

    }

    function draw() {

        const mx = mouseX;
        const my = mouseY;
        
        if (0 < mx && mx < capture.width && 0 < my && my < capture.height) {
            stepSize = ~~(map(mx, 0, capture.width, 2, 20));
            output = stepSize;
        }

        background(255);

        
    
        //blendMode(MULTIPLY)

        capture.loadPixels();

        for (let j = 0; j < capture.height; j++) {
            for (let i = 0; i < capture.width; i++) {

                const colorCyan = "#00aaff";
                const colorMagenta = "#ff00bb";
                const colorYellow = "ffd500";

                const idx = (i + j * capture.width) * stepSize
                
				const c = 255 - capture.pixels[idx + 0]
				//let m = (255 - capture.pixels[idx + 1]) / 255
				//let y = (255 - capture.pixels[idx + 2]) / 255

                strokeWeight(c)
                stroke(colorCyan)
                switch (shape[0]) {
                    case "line":
                        line(
                            i * stepSize, //X begin 
                            j * stepSize, //Y begin
                            i * stepSize + stepSize, //X end
                            j * stepSize + stepSize //Y end
                        )
                        break;
                    case "zig-zag":
                        beginShape();
                        vertex(
                            i * stepSize,
                            j * stepSize + stepSize
                        )
                        vertex(
                            i * stepSize + stepSize / 2,
                            j * stepSize + stepSize / 2
                        )
                        vertex(
                            i * stepSize + stepSize,
                            j * stepSize + stepSize,
                        )
                        endShape();
                        break;
                    case "curve":
                        bezier(
                            i * stepSize + stepSize / 2, //anchor
                            j * stepSize,

                            i * stepSize - stepSize, //control
                            j * stepSize + stepSize / 2,

                            i * stepSize + stepSize * 2, //control
                            j * stepSize + stepSize / 2,

                            i * stepSize + stepSize / 2, //anchor
                            j * stepSize + stepSize,
                        )
                        break;
                    case "squiggle":
                            bezier(
                                i * stepSize + getRndInteger(0, stepSize / 2),
                                j * stepSize + getRndInteger(0, stepSize / 2),

                                i * stepSize + getRndInteger(0, stepSize / 2),
                                j * stepSize + getRndInteger(0, stepSize / 2),

                                i * stepSize + getRndInteger(stepSize / 2, stepSize),
                                j * stepSize + getRndInteger(stepSize / 2, stepSize),

                                i * stepSize + getRndInteger(stepSize / 2, stepSize),
                                j * stepSize + getRndInteger(stepSize / 2, stepSize),
                            )

                        function getRndInteger(min, max) {
                            return Math.floor(Math.random() * (max - min + 1)) + min;
                        }
                        break;
                    case "nothing":
                        break;
                    }

                // strokeWeight(m)
                // stroke(colorMagenta)
                // switch (shape[1]) {
                //     case "line":
                //         line(
                //             i * stepSize, //X begin 
                //             j * stepSize, //Y begin
                //             i * stepSize + stepSize, //X end
                //             j * stepSize + stepSize //Y end
                //         )
                //         break;
                //     case "zig-zag":
                //         beginShape();
                //         vertex(
                //             i * stepSize,
                //             j * stepSize + stepSize
                //         )
                //         vertex(
                //             i * stepSize + stepSize / 2,
                //             j * stepSize + stepSize / 2
                //         )
                //         vertex(
                //             i * stepSize + stepSize,
                //             j * stepSize + stepSize,
                //         )
                //         endShape();
                //         break;
                //     case "curve":
                //         bezier(
                //             i * stepSize + stepSize / 2, //anchor
                //             j * stepSize,

                //             i * stepSize - stepSize, //control
                //             j * stepSize + stepSize / 2,

                //             i * stepSize + stepSize * 2, //control
                //             j * stepSize + stepSize / 2,

                //             i * stepSize + stepSize / 2, //anchor
                //             j * stepSize + stepSize,
                //         )
                //         break;
                //     case "squiggle":
                //             bezier(
                //                 i * stepSize + getRndInteger(0, stepSize / 2),
                //                 j * stepSize + getRndInteger(0, stepSize / 2),

                //                 i * stepSize + getRndInteger(0, stepSize / 2),
                //                 j * stepSize + getRndInteger(0, stepSize / 2),

                //                 i * stepSize + getRndInteger(stepSize / 2, stepSize),
                //                 j * stepSize + getRndInteger(stepSize / 2, stepSize),

                //                 i * stepSize + getRndInteger(stepSize / 2, stepSize),
                //                 j * stepSize + getRndInteger(stepSize / 2, stepSize),
                //             )

                //         function getRndInteger(min, max) {
                //             return Math.floor(Math.random() * (max - min + 1)) + min;
                //         }
                //     break;
                //     case "nothing":
                //     break;}

                // strokeWeight(y)
                // stroke(colorYellow)
                // switch (shape[2]) {
                //     case "line":
                //         line(
                //             i * stepSize, //X begin 
                //             j * stepSize, //Y begin
                //             i * stepSize + stepSize, //X end
                //             j * stepSize + stepSize //Y end
                //         )
                //         break;
                //     case "zig-zag":
                //         beginShape();
                //         vertex(
                //             i * stepSize,
                //             j * stepSize + stepSize
                //         )
                //         vertex(
                //             i * stepSize + stepSize / 2,
                //             j * stepSize + stepSize / 2
                //         )
                //         vertex(
                //             i * stepSize + stepSize,
                //             j * stepSize + stepSize,
                //         )
                //         endShape();
                //         break;
                //     case "curve":
                //         bezier(
                //             i * stepSize + stepSize / 2, //anchor
                //             j * stepSize,

                //             i * stepSize - stepSize, //control
                //             j * stepSize + stepSize / 2,

                //             i * stepSize + stepSize * 2, //control
                //             j * stepSize + stepSize / 2,

                //             i * stepSize + stepSize / 2, //anchor
                //             j * stepSize + stepSize,
                //         )
                //         break;
                //     case "squiggle":
                //             bezier(
                //                 i * stepSize + getRndInteger(0, stepSize / 2),
                //                 j * stepSize + getRndInteger(0, stepSize / 2),

                //                 i * stepSize + getRndInteger(0, stepSize / 2),
                //                 j * stepSize + getRndInteger(0, stepSize / 2),

                //                 i * stepSize + getRndInteger(stepSize / 2, stepSize),
                //                 j * stepSize + getRndInteger(stepSize / 2, stepSize),

                //                 i * stepSize + getRndInteger(stepSize / 2, stepSize),
                //                 j * stepSize + getRndInteger(stepSize / 2, stepSize),
                //             )

                //         function getRndInteger(min, max) {
                //             return Math.floor(Math.random() * (max - min + 1)) + min;
                //         }
                //         break;
                //     case "nothing":
                //     break;
                //     }

                //fine switch
            } //fine loop orizzontale
        } //fine loop verticale

        stroke(0);
        strokeWeight(1);
        rect(0, 0, width, height);
    } //fine draw

    function saveButton(a) {
        saveCanvas("Printing_Press", a);
    }
    
