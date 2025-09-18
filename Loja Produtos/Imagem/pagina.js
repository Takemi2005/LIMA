document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os botões "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    // Seleciona o ícone do carrinho no cabeçalho
    const cartIcon = document.querySelector('.header-icons .icon-link:nth-child(2)');
    // Cria um array para armazenar os produtos do carrinho
    let cart = [];

    // 2. Adiciona um "ouvinte de evento" para cada botão
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Pega o card do produto pai
            const productCard = event.target.closest('.product-card');
            
            // Pega as informações do produto
            const productName = productCard.querySelector('.product-name').innerText;
            const productPrice = parseFloat(productCard.querySelector('.product-price').innerText.replace('R$ ', '').replace(',', '.'));
            
            // Cria um objeto para o produto
            const product = {
                name: productName,
                price: productPrice,
                quantity: 1
            };

            // Adiciona o produto ao carrinho
            const existingProductIndex = cart.findIndex(item => item.name === product.name);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }

            // Atualiza o contador no ícone do carrinho
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            updateCartIcon(cartCount);

            alert(`${productName} adicionado ao carrinho!`);
        });
    });

    // 3. Função para atualizar o contador no ícone do carrinho
    function updateCartIcon(count) {
        // Remove um possível contador antigo
        const existingBadge = cartIcon.querySelector('.cart-badge');
        if (existingBadge) {
            existingBadge.remove();
        }

        if (count > 0) {
            const badge = document.createElement('span');
            badge.classList.add('cart-badge');
            badge.innerText = count;
            cartIcon.appendChild(badge);
        }
    }

    // 4. Adiciona um "ouvinte de evento" para o ícone do carrinho
    cartIcon.addEventListener('click', (event) => {
        event.preventDefault(); // Impede a navegação padrão
        if (cart.length > 0) {
            // Cria uma página simples para mostrar o carrinho
            let cartContent = '<h2>Seu Carrinho</h2><ul>';
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                cartContent += `<li>${item.name} (${item.quantity}) - R$ ${itemTotal.toFixed(2).replace('.', ',')}</li>`;
                total += itemTotal;
            });
            cartContent += `</ul><p>Total: R$ ${total.toFixed(2).replace('.', ',')}</p>`;
            
            // Abre uma nova janela para simular a página do carrinho
            const cartWindow = window.open('', 'Carrinho de Compras', 'width=400,height=500');
            cartWindow.document.body.innerHTML = cartContent;
        } else {
            alert('Seu carrinho está vazio.');
        }
    });
});