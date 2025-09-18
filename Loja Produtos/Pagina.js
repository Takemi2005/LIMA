document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartIconLink = document.querySelector('.header-icons .icon-link:nth-child(2)');
    const body = document.body;

    let cartItems = [];

    // Função para renderizar o carrinho em uma modal
    const renderCart = () => {
        let cartModal = document.querySelector('.cart-modal');
        if (!cartModal) {
            cartModal = document.createElement('div');
            cartModal.classList.add('cart-modal');
            body.appendChild(cartModal);
        }

        let cartContent = `
            <div class="cart-modal-content">
                <span class="close-btn">&times;</span>
                <h3>Seu Carrinho</h3>
                <ul class="cart-list">
                    ${cartItems.map((item, index) => `
                        <li class="cart-item">
                            <span class="item-name">${item.name}</span>
                            <span class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                            <button class="remove-item-btn" data-index="${index}">Remover</button>
                        </li>
                    `).join('')}
                </ul>
                <div class="cart-total">
                    Total: <span id="cart-total-price">R$ ${calculateTotal().toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="checkout-btn">Finalizar Compra</button>
            </div>
        `;
        cartModal.innerHTML = cartContent;

        // Adiciona evento para fechar a modal
        cartModal.querySelector('.close-btn').addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        // Adiciona evento para remover itens
        cartModal.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cartItems.splice(index, 1);
                updateCartCount();
                renderCart(); // Renderiza o carrinho novamente após a remoção
            });
        });
    };

    // Função para calcular o total do carrinho
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    // Função para atualizar o contador do carrinho
    const updateCartCount = () => {
        let cartCountElement = cartIconLink.querySelector('.cart-count');
        if (!cartCountElement) {
            cartCountElement = document.createElement('span');
            cartCountElement.classList.add('cart-count');
            cartIconLink.appendChild(cartCountElement);
        }
        if (cartItems.length > 0) {
            cartCountElement.innerText = cartItems.length;
            cartCountElement.style.display = 'flex';
        } else {
            cartCountElement.style.display = 'none';
        }
    };

    // Evento de clique no botão "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('.product-name').innerText;
            const productPriceText = productCard.querySelector('.product-price').innerText;
            const productPrice = parseFloat(productPriceText.replace('R$ ', '').replace(',', '.'));

            const product = {
                name: productName,
                price: productPrice
            };
            cartItems.push(product);
            updateCartCount();
            alert(`"${productName}" foi adicionado ao carrinho!`);
        });
    });

    // Evento de clique no ícone do carrinho
    cartIconLink.addEventListener('click', (event) => {
        event.preventDefault();
        const cartModal = document.querySelector('.cart-modal');
        if (cartModal) {
            cartModal.classList.add('active');
        }
        renderCart();
    });

    updateCartCount();
});