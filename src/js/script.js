// Função para fazer a requisição dos dados da cidade
async function fetchData(cityName) {
    const response = await fetch(`https://open-weather13.p.rapidapi.com/city/${cityName}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9f9cb143e3mshbda76824fd42e1fp1690f5jsnf4982d936279',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao obter os dados da cidade');
    }

    return response.json();
}

// Função para atualizar o mapa com as novas coordenadas
function atualizarMapa(lat, lon) {
    var iframe = document.getElementById("mapa");
    iframe.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1245702.4053521527!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1707000777662!5m2!1spt-BR!2sbr`;
}

// Função para atualizar as informações no card
function atualizaCard(temp, feelsLike, weather, sky, time, sunrise, sunset, min, max) {
    document.querySelector('.temp').innerText = temp;
    document.querySelector('.sensa-temica').innerText = feelsLike;
    document.querySelector('.clima').innerText = weather;
    document.querySelector('.sky').innerText = sky;
    document.querySelector('.hora').innerText = time;
    document.querySelector('.nascer-sol').innerText = sunrise;
    document.querySelector('.por-sol').innerText = sunset;
    document.querySelector('.minima').innerText = min;
    document.querySelector('.maxima').innerText = max;
}

// Função para converter Fahrenheit para Celsius
const convertFToC = tempF => `${((tempF - 32) * 5 / 9).toFixed(0)}°C`;

// Função para converter tempo UNIX para hora local
const convertTime = time => {
    let data = new Date(time * 1000);
    return data.toLocaleTimeString();
};

// Event listener para o botão de atualização
document.querySelector(".atualiza").addEventListener('click', async function () {
    const cityName = document.getElementById("cidade").value;

    try {
        const cityData = await fetchData(cityName);
        if (cityData) {
            const { coord, main, visibility, weather, sys, dt } = cityData;

            let lat = coord.lat;
            let lon = coord.lon;

            let temp = convertFToC(main.temp);
            let feels = convertFToC(main.feels_like);
            let tempMax = convertFToC(main.temp_max);
            let tempMin = convertFToC(main.temp_min);

            let clima = weather[0].main;
            let descripCilma = weather[0].description;

            let time = convertTime(dt);
            let sunrise = convertTime(sys.sunrise);
            let sunset = convertTime(sys.sunset);
            console.log(cityData)

            atualizaCard(temp, feels, clima, descripCilma, time, sunrise, sunset, tempMin, tempMax);
            atualizarMapa(lat, lon);
        }
    } catch (error) {
        console.log(error)
        alert('Cidade não encontrada. Por favor, verifique o nome da cidade e tente novamente.');
    }
});
