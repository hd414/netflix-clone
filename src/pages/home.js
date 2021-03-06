import React from 'react'
import { Link, Route } from 'react-router-dom'
import Feature from '../components/feature/feature.component'
import OptForm from '../components/opt-form/optform.component'
import FaqsContainer from '../containers/faqs'
import { FooterContainer } from '../containers/footer'
import HeaderContainer from '../containers/header'
import JumbotronContainer from '../containers/jumbotron'

export const Home = () => {
    return (
        <div>
            <HeaderContainer>
                <Feature>
                    <Feature.Title>Unlimited films, Tv programms and more</Feature.Title>
                    <Feature.SubTitle>Watch More and Cancel at any time</Feature.SubTitle>
                    <OptForm>
                        <OptForm.Input placeholder="Email address" />
                        <Link to="/Signin" ><OptForm.Button>Try it now</OptForm.Button></Link>
                        <OptForm.Break />
                        <br />
                        <OptForm.Text>Ready to watch? Enter your email to create or restart your membership.</OptForm.Text>
                    </OptForm>
                </Feature>

            </HeaderContainer>
            <JumbotronContainer />
            <FaqsContainer />
            <FooterContainer />

        </div>
    )
}
