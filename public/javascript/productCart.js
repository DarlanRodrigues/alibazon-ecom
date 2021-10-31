$(() => {
    $(".btn-add-cart").click(async (ev) => {
        ev.preventDefault();
        let response = await fetch('/cart/addItem',{ 
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: $(ev.target).data('product_id') || '',
                product_variant_id: $(ev.target).data('product_variant_id') || '',
                product_quantity: $(ev.target).data('product_quantity') || '1'
            })
        });

        if(response.status == 200){
            alert("Item added on cart");
        }else{
            alert("Error on add item on cart");
        }
    });

    $(".btn-remove-cart").click(async (ev) => {
        ev.preventDefault();
        let response = await fetch('/cart/removeItem',{ 
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: $(ev.target).data('product_id') || '',
                product_variant_id: $(ev.target).data('product_variant_id') || ''
            })
        });

        if(response.status == 200){
            alert("Item remove from cart");
            if(response.redirected === true){
                window.location.href = response.url;
            }
        }else{
            alert("Error on remove item from cart");
        }
    });
});