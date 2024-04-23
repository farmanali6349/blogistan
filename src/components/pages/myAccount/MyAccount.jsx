import React from 'react'
import { Container } from "../../index"
import { useSelector } from 'react-redux'
import { facebook, instagram, medium, linkedin, x } from "../../../assets/icons/index"
import "./MyAccount.css"
import { Link, useNavigate } from 'react-router-dom'

function MyAccount() {

  const author = useSelector(state => state.authorsSliceReducer.author);
  const navigate = useNavigate()

  return (
    <>
      {author ? (
        <>
          <div className="my-account">
            <div className="page-title">
              <Container>
                <div className="author-avatar">
                  <h2>{author.name && author.name.charAt(0)}</h2>
                </div>
              <h2>{author.name}</h2>
              {author.bio && author.bio ? <p>{author.bio}</p> : null}
              <h4>Author</h4>
              {(author.facebook || author.instagram || author.linkedin || author.twitter || author.medium) ? (
                <div className="social-icons">
                  {author.facebook && author.facebook ? (
                    <div className='social-icon'>
                      <Link to={author.facebook}><img src={facebook} alt="facebook" /></Link>
                    </div>
                  ) : null}
                  {author.instagram && author.instagram ? (
                    <div className='social-icon'>
                      <Link to={author.instagram}><img src={instagram} alt="instagram" /></Link>
                    </div>
                  ) : null}
                  {author.medium && author.medium ? (
                    <div className='social-icon'>
                      <Link to={author.medium}><img src={medium} alt="medium" /></Link>
                    </div>
                  ) : null}
                  {author.linkedin && author.linkedin ? (
                    <div className='social-icon'>
                      <Link to={author.linkedin}><img src={linkedin} alt="linkedin" /></Link>
                    </div>
                  ) : null}
                  {author.twitter && author.twitter ? (
                    <div className='social-icon'>
                      <Link to={author.twitter}><img src={x} alt="twitter" /></Link>
                    </div>
                  ) : null}
                </div>

              ) : null}

              <span className='link' onClick={() => navigate("/edit-profile")}>Edit Profile</span>
              </Container>
            </div>

            <Container>
              <h2 className='title'>My Blogs</h2>
            </Container>
          </div>
        </>
      ) : <p>No User Found</p>}
    </>
  )
}

export default MyAccount