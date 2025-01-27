const initRangeSlider = ($slider, $input, min, max, from, postfix = "") => {
    let instance;
    let userTyping = false;

    const updateInputValue = ($input, value) => {
        $input.prop("value", value.toLocaleString("ru-RU"));
    };

    $slider.ionRangeSlider({
        skin: "round",
        type: "single",
        min,
        max,
        from,
        step: 1,
        postfix,
        onStart: (data) => !userTyping && updateInputValue($input, data.from),
        onChange: (data) => !userTyping && updateInputValue($input, data.from)
    });

    instance = $slider.data("ionRangeSlider");

    $input.on("input", function () {
        userTyping = true;
        let val = parseInt($(this).val().replace(/\D+/g, ""), 10) || min;
        instance.update({ from: Math.min(Math.max(val, min), max) });
    }).on("blur", function () {
        userTyping = false;
        let val = parseInt($(this).val().replace(/\D+/g, ""), 10) || min;
        updateInputValue($input, Math.min(Math.max(val, min), max));
    });
};

$(document).ready(() => {
    initRangeSlider($("#price"), $("#price-input"), 1700000, 6000000, 3000000, " ₽");
    initRangeSlider($("#payment"), $("#payment-input"), 3000000, 4500000, 3500000, " ₽");
    initRangeSlider($("#term"), $("#term-input"), 1, 30, 20, " лет");
});

const calculatePayment = () => {
    const getNumber = (id) => parseFloat(document.getElementById(id).value.replace(/\s+/g, "")) || 0;
    const amount = getNumber("price-input");
    const years = getNumber("term-input");

    if (amount <= 0 || years <= 0) {
        return alert("Введите корректные числовые значения!");
    }

    const monthPayment = document.querySelector("#monthPayment");
    const monthPaymentFamily = document.querySelector("#monthPaymentFamily");

    const calcMonthlyPayment = (interest) => {
        const monthlyRate = interest / 100 / 12;
        const payments = years * 12;
        const factor = Math.pow(1 + monthlyRate, payments);
        return Math.round((amount * factor * monthlyRate) / (factor - 1));
    };

    monthPayment.textContent = calcMonthlyPayment(27) + " ₽";
    monthPaymentFamily.textContent = calcMonthlyPayment(6) + " ₽";
};

document.getElementById("mortgage-form").addEventListener("submit", function (e) {
    e.preventDefault();
    calculatePayment();
});
