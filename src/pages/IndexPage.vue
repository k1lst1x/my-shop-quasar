<template>
  <div class="q-pa-md">
    <div class="row q-gutter-sm">
      <div class="col-auto">
        <q-btn
          key="all"
          label="All Brands"
          value="all"
          @click="filterByBrand('all')"
          class="brand-button"
        />
        <div class="row" v-for="(brand, index) in uniqueBrands" :key="index">
          <q-btn
            :label="`Brand ${brand}`"
            :value="brand"
            @click="filterByBrand(brand)"
            class="brand-button"
          />
        </div>
        <q-btn @click="showCart = true">Open Cart</q-btn>
        <q-dialog v-model="showCart">
          <q-card>
            <q-card-section>
              <h4>Your Cart</h4>
              <div v-if="Object.keys(cart).length === 0">Your cart is empty.</div>
              <div v-else>
                <q-list>
                  <q-item v-for="(item, productId) in cart" :key="productId">
                    <q-item-section>
                      <img :src="item[0].imgSrc" alt="Product Image" :class="{ 'product-img-cart': showCart }">
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <div class="text-h6">{{ item[0].title }}</div>
                        <div class="brand-label">{{ item[0].brand }}</div>
                        <div class="price">{{ item[0].price }}</div>
                        <q-btn @click="removeFromCart(productId)">Remove</q-btn>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <div>{{ item.length }}</div>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-btn @click="removeAllItemsFromCart">Remove All Items</q-btn>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Close" color="primary" @click="showCart = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <div class="col">
        <div class="row">
          <q-intersection
            v-for="product in filteredProducts"
            :key="product.index"
            class="card-item"
            :data-product-id="product.id"
          >
            <q-card flat bordered class="q-ma-sm">
              <img class="product-img" src="./17838081-1.png">

              <q-card-section>
                <div class="text-h6">{{ product.name }}</div>
                <q-rating
                  v-model="model2"
                  max="7"
                  size="2em"
                  color="yellow"
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  no-dimming
                />
                <div class="item-title">Description</div>
                <div class="brand-label">{{ product.brand }}</div>
                <div class="price">{{ product.price }}</div>
                <q-btn @click="addToCart(product)" data-cart>+ Add to cart</q-btn>
              </q-card-section>
            </q-card>
          </q-intersection>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.card-item
  height: 410px
  width: 290px

.brand-button
  margin-bottom: 10px

.product-img-cart
  max-width: 100px
  max-height: 100px
  margin-right: 100px
</style>

<script>
import { defineComponent, ref, computed } from 'vue'
import cartImage from './17838081-1.png'

const products = [
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand 1',
    price: '100$'
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand 2',
    price: '150$'
  },
  {
    id: 3,
    name: 'Product 3',
    brand: 'Brand 3',
    price: '50$'
  },
  {
    id: 4,
    name: 'Product 4',
    brand: 'Brand 4',
    price: '120$'
  },
  {
    id: 5,
    name: 'Product 5',
    brand: 'Brand 5',
    price: '140$'
  },
  {
    id: 6,
    name: 'Product 6',
    brand: 'Brand 6',
    price: '130$'
  },
  {
    id: 7,
    name: 'Product 7',
    brand: 'Brand 1',
    price: '180$'
  },
  {
    id: 8,
    name: 'Product 8',
    brand: 'Brand 2',
    price: '90$'
  },
  {
    id: 9,
    name: 'Product 9',
    brand: 'Brand 3',
    price: '200$'
  },
  {
    id: 10,
    name: 'Product 10',
    brand: 'Brand 4',
    price: '190$'
  },
  {
    id: 11,
    name: 'Product 11',
    brand: 'Brand 5',
    price: '300$'
  },
  {
    id: 12,
    name: 'Product 12',
    brand: 'Brand 6',
    price: '210$'
  },
  {
    id: 13,
    name: 'Product 13',
    brand: 'Brand 1',
    price: '110$'
  },
  {
    id: 14,
    name: 'Product 14',
    brand: 'Brand 2',
    price: '160$'
  },
  {
    id: 15,
    name: 'Product 15',
    brand: 'Brand 3',
    price: '70$'
  },
  {
    id: 16,
    name: 'Product 16',
    brand: 'Brand 4',
    price: '130$'
  },
  {
    id: 17,
    name: 'Product 17',
    brand: 'Brand 5',
    price: '150$'
  },
  {
    id: 18,
    name: 'Product 18',
    brand: 'Brand 6',
    price: '140$'
  },
  {
    id: 19,
    name: 'Product 19',
    brand: 'Brand 1',
    price: '190$'
  },
  {
    id: 20,
    name: 'Product 20',
    brand: 'Brand 2',
    price: '100$'
  },
  {
    id: 21,
    name: 'Product 21',
    brand: 'Brand 3',
    price: '220$'
  },
  {
    id: 22,
    name: 'Product 22',
    brand: 'Brand 4',
    price: '210$'
  },
  {
    id: 23,
    name: 'Product 23',
    brand: 'Brand 5',
    price: '320$'
  },
  {
    id: 24,
    name: 'Product 24',
    brand: 'Brand 6',
    price: '230$'
  },
  {
    id: 25,
    name: 'Product 25',
    brand: 'Brand 1',
    price: '120$'
  },
  {
    id: 26,
    name: 'Product 26',
    brand: 'Brand 2',
    price: '70$'
  },
  {
    id: 27,
    name: 'Product 27',
    brand: 'Brand 3',
    price: '180$'
  },
  {
    id: 28,
    name: 'Product 28',
    brand: 'Brand 4',
    price: '170$'
  },
  {
    id: 29,
    name: 'Product 29',
    brand: 'Brand 5',
    price: '280$'
  },
  {
    id: 30,
    name: 'Product 30',
    brand: 'Brand 6',
    price: '240$'
  }
]

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const model2 = ref(2.3)
    const selectedBrand = ref('all')
    const uniqueBrands = computed(() => {
      const brands = new Set(products.map(product => product.brand))
      return [...brands]
    })
    const filteredProducts = computed(() => {
      if (selectedBrand.value === 'all') {
        return products
      } else {
        return products.filter(product => product.brand === selectedBrand.value)
      }
    })
    const cart = ref({})
    const filterByBrand = (brand) => {
      selectedBrand.value = brand
    }
    const showCart = ref(false)
    const addToCart = function (product) {
      const productId = product.id.toString()
      if (cart.value[productId]) {
        cart.value[productId].push({
          imgSrc: cartImage,
          title: product.name,
          brand: product.brand,
          price: product.price
        })
      } else {
        cart.value[productId] = [{
          imgSrc: cartImage,
          title: product.name,
          brand: product.brand,
          price: product.price
        }]
      }
    }
    const removeFromCart = function (productId) {
      if (cart.value[productId].length === 1) {
        delete cart.value[productId]
      } else {
        cart.value[productId].pop()
      }
    }
    const removeAllItemsFromCart = function () {
      for (const productId in cart.value) {
        delete cart.value[productId]
      }
    }
    return {
      model2,
      selectedBrand,
      uniqueBrands,
      filteredProducts,
      filterByBrand,
      resetModels () {
        model2.value = 2.3
      },
      addToCart,
      cart,
      showCart,
      removeFromCart,
      removeAllItemsFromCart
    }
  }
})
</script>
