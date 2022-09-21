        const form = document.forms.inputValues;
        const yInput = form.yValue;
        const rInput = form.rValue;
        const tbody = document.querySelector(".action-area__right-subarea__history-table > table > tbody")

        const submitButton = form.submitButton;

        const COLOR__WRONG_RED =  "#B22222";
        const Y_MIN_VALUE = -5;
        const Y_MAX_VALUE = 3;
        const R_MAX_VALUE = 4;
        const R_MIN_VALUE = 1;

        submitButton.onclick = function(e) {
            e.preventDefault();
            let xValue = form.elements.xValue.value;
            let yValue = form.yValue.value;
            let rValue = form.rValue.value;

            yValue = yValue.replace(",", ".");
            rValue = rValue.replace(",", ".");

            let y = parseFloat(yValue);
            let r = parseFloat(rValue);

            function changeState(elem) {
                elem.style.background = COLOR__WRONG_RED;
            }

            if ((isNaN(y) || isNaN(r)) || (y < Y_MIN_VALUE || y > Y_MAX_VALUE) || (r < R_MIN_VALUE || r > R_MAX_VALUE)) {
                if (isNaN(y) || y < Y_MIN_VALUE || y > Y_MAX_VALUE) {
                    changeState(yInput);
                }
                if (isNaN(r) || r < R_MIN_VALUE || r > R_MAX_VALUE) {
                    changeState(rInput);
                }
            } else if (((!isNaN(y)) && !isNaN(r)) && (y >= Y_MIN_VALUE && y <= Y_MAX_VALUE) && (r >= R_MIN_VALUE || r <= R_MAX_VALUE)) {
                function request() {
                    let body = new FormData();
                    body.append("x", xValue);
                    body.append("y", y.toString());
                    body.append("r", r.toString());
                    return fetch("http://localhost:5001/server.php", {
                        method: 'POST',
                        body: body,
                        headers: {
                        }
                    });

                    //TODO method json() instead of text()
                }
                request()
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        }
                    },
                    err => {
                        console.log(err);
                        alert(err);
                    })
                    .then(data => tbody.insertAdjacentHTML("beforeend", data));
            }
        }

        form.oninput = function () {
            yInput.style.background = "white";
            rInput.style.background = "white";
        }