        const form = document.forms.inputValues;
        const yInput = form.yValue;
        const rInput = form.rValue;
        const tbody = document.querySelector(".action-area__right-subarea__history-table > table > tbody")
        const submitButton = form.submitButton;

        const COLOR__WRONG_RED = "#B22222";
        const Y_MIN_VALUE = -5;
        const Y_MAX_VALUE = 3;
        const R_MAX_VALUE = 4;
        const R_MIN_VALUE = 1;

        form.oninput = function () {
            yInput.style.background = "white";
            rInput.style.background = "white";
        }

        function changeState(elem) {
            elem.style.background = COLOR__WRONG_RED;
        }

        function getFloatLength(num) {
            const array = num.toString().split(".");
            return array[1]?.length === undefined ? 0 : array[1].length;
        }

        form.onsubmit = function(e) {
            e.preventDefault();
            let xValue = form.elements.xValue.value;
            let yValue = form.yValue.value;
            let rValue = form.rValue.value;

            yValue = yValue.replace(",", ".");
            rValue = rValue.replace(",", ".");

            if ((isNaN(yValue) || isNaN(rValue)) || (yValue < Y_MIN_VALUE || yValue > Y_MAX_VALUE) || (rValue < R_MIN_VALUE || rValue > R_MAX_VALUE) || (getFloatLength(yValue) > 8 || getFloatLength(rValue) > 8 || getFloatLength(xValue) > 8)) {
                if (isNaN(yValue) || yValue < Y_MIN_VALUE || yValue > Y_MAX_VALUE || getFloatLength(yValue) > 8) {
                    changeState(yInput);
                }
                if (isNaN(rValue) || rValue < R_MIN_VALUE || rValue > R_MAX_VALUE || getFloatLength(rValue) > 8) {
                    changeState(rInput);
                }
            } else if (((!isNaN(yValue)) && !isNaN(rValue)) && (yValue >= Y_MIN_VALUE && yValue <= Y_MAX_VALUE) && (rValue >= R_MIN_VALUE || rValue <= R_MAX_VALUE)) {
                request({xValue, yValue, rValue})
                    .then(response => {
                            if (response.ok) { return response.text(); }
                        },
                        err => {
                            console.log(err);
                            alert(err);
                        })
                    .then(data => tbody.insertAdjacentHTML("beforeend", data));
            }
        }

        function request({xValue, yValue, rValue}) {
            let body = new FormData();
            body.append("x", xValue);
            body.append("y", yValue);
            body.append("r", rValue);
            return fetch("http://localhost:5001/server.php", {
                method: "POST",
                body: body,
                headers: {}
            });
        }

