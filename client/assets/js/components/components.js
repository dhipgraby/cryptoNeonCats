    function renderMenu(){
        $('#navMenu').html(menu)
    }

    var menu = `
    <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand"><img src="assets/img/logo2.png" style="width: 10vw"><img src="assets/img/logo.png"
                    style="width: 7vw"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="factory.html">NeonCat Factory</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="catalogue.html">My NeonCats</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="breeding.html">Breeding</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="marketplace.html">Marketplace</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="info.html">Info</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav> `