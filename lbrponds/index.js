
document.addEventListener('DOMContentLoaded', async () => {
    window.ponds = await (await fetch("ponds.json")).json();

    document.querySelector('#savefile').addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) { return; }
      
        const reader = new FileReader();
        reader.onload = () => {
            window.save = JSON.parse(atob(reader.result).replace(/#\w+#$/g, ''));
            document.querySelector('#seed').value = parseInt(window.save.profiles.def.objects.o_game.data.stats.random_num);
            document.querySelector('#searches').value = parseInt(window.save.profiles.def.objects.o_game.data.stats.fishing_spots);
            document.querySelector('#goggles').value = parseInt(window.save.profiles.def.shops.fish.fishing_spots_rarity_multiplier.count);

            render();
        };
        reader.onerror = () => {
            showMessage("Error reading the file. Please try again.", "error");
        };
        reader.readAsText(file);
    });

    document.querySelector('#submit').addEventListener('click', e => {
        e.preventDefault();
        render();
    });
});

function render() {
    const seed = parseInt(document.querySelector('#seed').value);
    const searches = parseInt(document.querySelector('#searches').value);
    const goggles = parseInt(document.querySelector('#goggles').value);
    const rescount = parseInt(document.querySelector('#rescount').value);
    const special = document.querySelector('#special').value;

    for (let i = 0; ; i++) {
        if (window.ponds[i + seed + searches][goggles].match(new RegExp("^Legendary:"+special))) {
            document.querySelector('#nextleg').textContent = `Your next ${special.length ? special + ' Legendary is' : 'Legendary is ' + window.ponds[i + seed + searches][goggles].replace(/^Legendary:/g, '')} in ${i + 1} searches`;
            break;
        }
    }

    var res = window.ponds.slice(seed + searches, rescount + seed + searches).map((v, k) => `<span class="${v[goggles].replace(':', ' ')}">${k + 1} (seed #${seed + searches + k}) - ${v[goggles].replace(':', ' ')}</span>`);

    if (!document.querySelector('#filterleg').checked) {
        res = res.filter(v => !v.match(/\<span class="Legendary/));
    }
    if (!document.querySelector('#filtermyth').checked) {
        res = res.filter(v => !v.match(/\<span class="Mythical/));
    }
    if (!document.querySelector('#filterepic').checked) {
        res = res.filter(v => !v.match(/\<span class="Epic/));
    }
    if (!document.querySelector('#filterrare').checked) {
        res = res.filter(v => !v.match(/\<span class="Rare/));
    }
    if (!document.querySelector('#filterunc').checked) {
        res = res.filter(v => !v.match(/\<span class="Uncommon/));
    }
    if (!document.querySelector('#filtercomm').checked) {
        res = res.filter(v => !v.match(/\<span class="Common/));
    }

    if (!document.querySelector('#filterreg').checked) {
        res = res.filter(v => !v.match(/\<span class="\w+ Regular/));
    }
    if (!document.querySelector('#filterfast').checked) {
        res = res.filter(v => !v.match(/\<span class="\w+ Fast/));
    }
    if (!document.querySelector('#filterglam').checked) {
        res = res.filter(v => !v.match(/\<span class="\w+ Glamorous/));
    }
    if (!document.querySelector('#filterluck').checked) {
        res = res.filter(v => !v.match(/\<span class="\w+ Lucky/));
    }
    if (!document.querySelector('#filtermag').checked) {
        res = res.filter(v => !v.match(/\<span class="\w+ Magic/));
    }
    if (!document.querySelector('#filterstr').checked) {
        res = res.filter(v => !v.match(/\<span class="\w+ Strong/));
    }

    document.querySelector('#result').innerHTML = res.join("");
}