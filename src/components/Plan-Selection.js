import React, { useState, useEffect, } from "react";
import { db } from "../firebase";
import styled from "styled-components";
import { selectUserEmail,selectUserUID } from "../features/user/UserSliec";
import { collection, doc, addDoc, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

function PlanScreen() {
  const [products, setProducts] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null);
  const email = useSelector(selectUserEmail);
  const [loading, setLoading] = useState(false);
  const UID = useSelector(selectUserUID);
  console.log("email" + email +"UID" + UID)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const activeProductsQuery = query(productsRef, where("active", "==", true));
        const querySnapshot = await getDocs(activeProductsQuery);

        const productsData = {};
        for (const productDoc of querySnapshot.docs) {
          const productInfo = productDoc.data();
          const pricesRef = collection(db, `products/${productDoc.id}/prices`);
          const priceSnap = await getDocs(pricesRef);

          const prices = [];
          priceSnap.docs.forEach((priceDoc) => {
            prices.push({
              priceId: priceDoc.id,
              priceData: priceDoc.data(),
            });
          });

          productsData[productDoc.id] = { ...productInfo, prices };
        }

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const loadCheckout = async (priceId) => {
    if (!priceId) {
      console.error("Price ID is undefined")
      return
    }

    setLoading(true)

    try {
      const userDocRef = doc(db, "customers", UID)
      const checkoutSessionsCollectionRef = collection(userDocRef, "checkout_sessions")

      const docRef = await addDoc(checkoutSessionsCollectionRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })

      onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data()

        if (error) {
          console.error("Stripe error:", error.message)
          alert(`An error occurred: ${error.message}`)
          setLoading(false)
        }

        if (sessionId) {
          const stripe = await loadStripe('pk_test_51QWBK7BLG9FMSoXa4lrQSG8BvSlLJ9J1hYpGSj3ctIPFc7RaTDFrFL0oH0RgX3kN1jc0rGSUEcRqmbDrpETT8pAg00ROBOZh0x')
          if (stripe) {
            const { error: redirectError } = await stripe.redirectToCheckout({ sessionId })
            if (redirectError) {
              console.error("Stripe redirect error:", redirectError)
              alert(`An error occurred: ${redirectError.message}`)
            }
          } else {
            console.error("Stripe failed to load")
            alert("An error occurred while loading the payment system.")
          }
          setLoading(false)
        }
      })
    } catch (error) {
      console.error("Error in loadCheckout:", error)
      alert("An error occurred while setting up the checkout.")
      setLoading(false)
    }
  }
  

  return (
    <Container>
      {Object.entries(products).map(([productId, productData]) => (
        <Card key={productId}>
          <Title>Disney+ Subscription</Title>
          <Form onSubmit={(e) => e.preventDefault()}>
            <EmailHeading>{email}</EmailHeading>

            <ProductsContainer>
              <ProductCard
                key={productId}
                onClick={() => setSelectedProductId(productId)}
                isSelected={selectedProductId === productId}
              >
                <h3>{productData.name}</h3>
                <p>{productData.description}</p>
                {productData.prices?.map((price) => (
                  <p key={price.priceId}>
                    Price: ${price.priceData.unit_amount / 100}
                  </p>
                ))}
              </ProductCard>
            </ProductsContainer>

            {productData.prices?.map((price) => (
              <Button key={price.priceId} onClick={() => loadCheckout(price.priceId)} disabled={selectedProductId !== productId}>
                Subscribe Now
              </Button>
            ))}
          </Form>
        </Card>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/images/login-background.jpg") no-repeat center center/cover;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  z-index: -1;
`;  

export const Card = styled.div`
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;


export const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

export const EmailHeading = styled.h2`
  color: #ccc;
  margin-bottom: 15px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  background-color: #e50914;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f40612;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

export const ProductsContainer = styled.div`
  margin-top: 10px;
`;

export const ProductCard = styled.div`
  background: ${({ isSelected }) => (isSelected ? "#444" : "#333")};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: ${({ isSelected }) => (isSelected ? "0 0 10px #e50914" : "none")};

  h3, p {
    color: #fff;
  }
`;

export default PlanScreen;
