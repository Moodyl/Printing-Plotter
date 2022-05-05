    let canva;
    let capture;
    let stepSize;

    function setup() {

        canva = createCanvas(400, 400 / (16 / 9));
        canva.position((windowWidth - width) / 2, (windowHeight - height) / 2)

        capture = createCapture(VIDEO);
        capture.size(canva.width, canva.height);
        capture.hide();

        noFill();

    }

    function windowResized() {
        canva.position((windowWidth - width) / 2, (windowHeight - height) / 2)
    }

    function draw() {

        let mx = mouseX;
        let my = mouseY;
        
        if (0 < mx && mx < canva.width && 0 < my && my < canva.height) {
            stepSize = round(map(mx, 0, canva.width, 2, 20));
            document.getElementById('stepSize-output').innerHTML = stepSize;
        }

        background(240);


        capture.loadPixels();

        for (let j = 0; j < canva.height; j++) {
            for (let i = 0; i < canva.width; i++) {
                const index = (i + j * capture.width) * stepSize;
                const darkness = (255 - capture.pixels[index * 4]) / 255;
                const weight = stepSize * darkness;
                strokeWeight(weight)
                strokeCap(PROJECT)
                stroke(document.querySelector('input[name="pickColor"]:checked').value)

                switch (document.querySelector('input[name="pickShape"]:checked').id) {
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
                } //fine switch
            } //fine loop orizzontale
        } //fine loop verticale

        stroke(0);
        strokeWeight(1);
        noFill();
        rect(0, 0, width, height);
    } //fine draw

    function saveButton() {
        saveCanvas("Printing_Press", "jpg");
    }
    
