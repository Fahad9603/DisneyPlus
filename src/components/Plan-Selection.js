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
        <Header>
    <Title>Choose Your Plan</Title>
    <EmailHeading>Email: {email}</EmailHeading>
  </Header>
  <PlansWrapper>
      {Object.entries(products).map(([productId, productData]) => (
        <Card key={productId}>
          <Form onSubmit={(e) => e.preventDefault()}>
           

        
              <ProductCard
                key={productId}
                onClick={() => setSelectedProductId(productId)}
                isSelected={selectedProductId === productId}
              >  <PlanHeader>
          <PlanLogo src="/images/logo.svg" alt="Disney+" />
          <PlanTitle>{productData.name}</PlanTitle>
          <PlanDescription>{productData.description}</PlanDescription>
                </PlanHeader>
                <PlanFeatures>
                {productData.prices?.map((price) => (
                  <Feature key={price.priceId}>
                    Price: ${price.priceData.unit_amount / 100} /Month
                  </Feature>
                ))}
                </PlanFeatures>
              </ProductCard>
     

            {productData.prices?.map((price) => (
              <Button key={price.priceId} onClick={() => loadCheckout(price.priceId)} disabled={selectedProductId !== productId}>
                Subscribe Now
              </Button>
            ))}
          </Form>
        </Card>
      ))}
        </PlansWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: inherit;
  display: flex;
  align-items: center;
  flex-direction: column;
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


const PlanLogo = styled.img`
height: 40px;
margin-bottom: 10px;
`;
const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: white;
`;

const EmailHeading = styled.h3`
  font-size: 18px;
  color: #ddd;
  margin-top: 10px;
`;

const PlanHeader = styled.div`
  margin-bottom: 20px;
`;

const PlanTitle = styled.h3`
  font-size: 20px;
  color: white;
  margin-bottom: 5px;
`;

const PlanDescription = styled.p`
  font-size: 14px;
  color: #999;
`;

const PlanFeatures = styled.div`

  margin-bottom: 20px;
`;

const Feature = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;
const PlansWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
    box-shadow: -9px 9px 9px rgba(0, 0, 0, 264);
      border-radius: 21px;
  
  @media (max-width: 768px) {
    max-width: 90%;
    height: auto;
  }
`;
export const Card = styled.div`
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;



export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  background-color: #0063e5;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0063e5;
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
 background: ${({ isSelected }) => (isSelected ? "#444" : "#00000057")};
  border: 2px solid ${({ isSelected }) => (isSelected ? "#0063e5" : "#333")};
  border-radius: 12px;
  padding: 20px;
  width: 300px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color:#0063e5;
  }
`;

export default PlanScreen;
