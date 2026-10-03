const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    btnLogin.addEventListener('click', async () => {
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user, password: pass })
            });

            const data = await response.json();
            console.log("El backend dice:", data.message);

            if (user === 'Ringo' && pass === '1234') {
                alert("Conexion con API exitosa. \nMensaje del servidor: " + data.message);
                window.location.href = 'profile.html';
            } else {
                errorMsg.classList.remove('d-none');
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con la API en el puerto 4000.");
        }
    });
}

const radios = document.querySelectorAll('input[name="visibilidad"]');
const contenidoOculto = document.getElementById('contenido-oculto');

radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'mostrar') {
            contenidoOculto.classList.remove('d-none');
        } else {
            contenidoOculto.classList.add('d-none');
        }
    });
});

const countryRegionData = {
    "México": ["Nuevo León", "Jalisco", "CDMX"],
    "Estados Unidos": ["Texas", "California", "Nueva York"],
    "España": ["Madrid", "Barcelona", "Valencia"]
};

const selectCountry = document.getElementById('country');
const selectRegion = document.getElementById('region');

if (selectCountry && selectRegion) {
    for (let country in countryRegionData) {
        let option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        selectCountry.appendChild(option);
    }

    selectCountry.addEventListener('change', (e) => {
        selectRegion.innerHTML = '<option value="">Selecciona una región...</option>';
        const regions = countryRegionData[e.target.value] || [];

        regions.forEach(region => {
            let option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            selectRegion.appendChild(option);
        });
    });
}

const check1 = document.getElementById('check1');
const check2 = document.getElementById('check2');
const btnEnviar = document.getElementById('btnEnviar');

const validarCheckboxes = () => {
    if (check1 && check2 && btnEnviar) {
        btnEnviar.disabled = !(check1.checked && check2.checked);
    }
};

if (check1 && check2) {
    check1.addEventListener('change', validarCheckboxes);
    check2.addEventListener('change', validarCheckboxes);
}

if (btnEnviar) {
    btnEnviar.addEventListener('click', async () => {
        const pais = selectCountry.value;
        const region = selectRegion.value;

        try {
            const response = await fetch('http://localhost:4000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: "Usuario_de_" + region,
                    role: pais
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Éxito! " + data.message);
            } else {
                alert("Error al crear usuario.");
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudo conectar con la API de base de datos.");
        }
    });
}
