
document.addEventListener('DOMContentLoaded', async () => {
    window.ponds = await (await fetch("ponds.json")).json();
    render();

    document.querySelector('#submit').addEventListener('click', e => {
        e.preventDefault();
        render();
    });
});

function render() {
    const special = document.querySelector('#special').value;
    const rarity = document.querySelector('#rarity').value;

    for (let i = 0; i < 6; i++) {
        var res = window.ponds.map((v, k) => `<span class="${v[i].replace(':', ' ')}">seed #${k} - ${v[i].replace(':', ' ')}</span>`);
        res = res.filter(v => v.match(new RegExp("^<span class=\"" + rarity + " " + special)));
        document.querySelector('#result'+i).innerHTML = res.join("");
        document.querySelector('#result'+i+'name').innerHTML = `${i}/5 Goggle - ${res.length} seeds`;
    }
}