var amazonApp = (function () {
        // Load the current local storage content
        var searches = JSON.parse(localStorage.getItem("searches") || '[]'),
            maxNumberOfItems = 5,
            listNode = $(".search-list"),
            container = $('.products'),
            loader = $('.loader'); // Add the submit icon action

        $('.search-form-search-icon').click(function () {
            $('#search-form').submit();
        });

        $('[name="keyword"]').keydown(function (e) {

            // Check for clicking on the return key
            e.keyCode === 13 ? searchProducts() : '';
        })

        /**
         * Add event listeners to the new created elements in the page
         */
        function addEventListeners() {

            // Add the mouseover event to the product box
            $('.product-summary').hover(function () {
                $('.product-summary').css('opacity', 0.25);
                $(this).css('opacity', 1);
            }, function () {
                $('.product-summary').css('opacity', 0.75);
            });

            // Add the mouseover event to the product box
            $('.product-summary').click(function () {
                loadData({
                    url: "/searchItem",
                    method: "get",
                    data: {
                        "itemId": $(this).attr('data-ASIN')
                    }
                });
            });
            $('.search-list-item').click(function () {

                $('[name="keyword"]').val($(this).attr('data-keyword'));
                searchProducts();
            });

            $('.clear-searches').click(function () {
                localStorage.clear();
                searches = [];
                fadeOutLastSearches();
                //listNode.empty(); // Create the new list
            });

            $('.product-summary').hover(function () {
                $(this).toggleClass('pulse animated');
            })
        }

        /**
         * Animate the fade out of the searches
         */
        function fadeOutLastSearches() {

            // aiimate the fade out of the elemnts
            $('.search-list-item:last-of-type').fadeOut(500,
                function () {
                    $(this).remove();
                    fadeOutLastSearches();
                });

        }

        /***********************/
        /*
         **  Search product
         */
        function searchProducts() {
            // Get the current search
            var keyword = $('[name="keyword"]').val(); // save the date of the search
            // Update the latest search results
            searches.unshift(keyword);
            localStorage.setItem("searches", JSON.stringify(searches)); // Load the search results
            loadData({
                url: "/search",
                method: "post",
                data: {
                    "keyword": keyword
                }
            }); // Update the list of searches
            updatePrevoiusList(); // Send the form
            return true;
        }

        /**
         * Display the loader and clear the content area
         */
        function showLoader() {
            // Set the top of the loader since it should be under the nav
            loader.css('top', $('nav').outerHeight());
            loader.css('bottom', $('footer').outerHeight()); // Show the loader
            loader.fadeIn("slow");
            container.html('');
        }

        /**
         * Hide the loader and display the data
         */
        function hideLoader(content) {
            // hide the loader
            loader.fadeOut(1000, function () {
                //  Set the content
                container.html(content);
                addEventListeners();
            });
        }

        /**
         * Load the ajax products search
         */
        function loadData(options) {
            $.ajax($.extend({
                beforeSend: showLoader,
                method: "get"
            }, options)).done(hideLoader);
        }


        /* Update the prevoius searches */
        function updatePrevoiusList() {
            // Number of items to display
            var maxIndex = Math.min(searches.length, maxNumberOfItems); // Remove all prevoius items
            // Clear prevoius list
            listNode.empty(); // Create the new list
            $("<li class='clear-searches'></li>").appendTo(".search-list"); // Add delete al button
            for (var index = 0; index < maxIndex; index++) {
                $(`<li class="search-list-item" data-keyword="${searches[index]}"> ${searches[index]}</li>`)
                    .appendTo(".search-list");
            };
        }

        updatePrevoiusList();

        searchProducts();

        return {
            searchProducts: searchProducts
        }
    } // function
)();