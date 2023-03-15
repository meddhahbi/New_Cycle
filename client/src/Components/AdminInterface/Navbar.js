



export default function NavbarAdmin(){




return <div>

{/* <div className="page-header">
        <div className="header-wrapper row m-0">
          <div className="header-logo-wrapper col-auto p-0">
            <div className="toggle-sidebar"><i className="status_toggle middle sidebar-toggle" data-feather="grid"> </i></div>
            <div className="logo-header-main"><a href="index.html"><img className="img-fluid for-light img-100" src="../assets/images/logo/logo2.png" alt="" /><img className="img-fluid for-dark" src="../assets/images/logo/logo.png" alt="" /></a></div>
          </div>
          <div className="left-header col horizontal-wrapper ps-0">
            <div className="left-menu-header">
              <ul className="app-list">
                <li className="onhover-dropdown">
                  <div className="app-menu"> <i data-feather="folder-plus"></i></div>
                  <ul className="onhover-show-div left-dropdown">
                    <li> <a href="file-manager.html">File Manager</a></li>
                    <li> <a href="kanban.html"> Kanban board</a></li>
                    <li> <a href="social-app.html"> Social App</a></li>
                    <li> <a href="bookmark.html"> Bookmark</a></li>
                  </ul>
                </li>
              </ul>
              <ul className="header-left"> 
                <li className="onhover-dropdown"><span className="f-w-600">Dashboard</span><span><i className="middle" data-feather="chevron-down"></i></span>
                  <ul className="onhover-show-div left-dropdown">
                    <li> <a href="index.html">Default</a></li>
                    <li> <a href="dashboard-02.html"> Ecommerce</a></li>
                  </ul>
                </li>
                <li className="onhover-dropdown"><span className="f-w-600">Application</span><span><i className="middle" data-feather="chevron-down"></i></span>
                  <ul className="onhover-show-div left-dropdown">
                    <li className="flyout-right"><a href="#">Project</a>
                      <ul>
                        <li> <a href="projects.html">Project List</a></li>
                        <li> <a href="projectcreate.html">Project Create</a></li>
                      </ul>
                    </li>
                    <li><a href="file-manager.html">File manager</a></li>
                    <li><a href="kanban.html">kanban</a></li>
                    <li className="flyout-right"><a href="#">Ecommerce</a>
                      <ul>
                        <li> <a href="product.html">Product</a></li>
                        <li> <a href="product-page.html">Product Page</a></li>
                        <li> <a href="list-products.html">Product List</a></li>
                        <li> <a href="payment-details.html">Payment Details</a></li>
                        <li> <a href="order-history.html">Order History</a></li>
                        <li> <a href="invoice-template.html">Invoice</a></li>
                        <li> <a href="cart.html">Cart</a></li>
                        <li> <a href="list-wish.html">Wishlist</a></li>
                        <li> <a href="checkout.html">Checkout</a></li>
                        <li> <a href="pricing.html">Pricing </a></li>
                      </ul>
                    </li>
                    <li className="flyout-right"><a href="#">Email</a>
                      <ul>
                        <li> <a href="email_inbox.html">Mail Inbox</a></li>
                        <li> <a href="email_read.html">Read Mail</a></li>
                        <li> <a href="email_compose.html">Compose</a></li>
                      </ul>
                    </li>
                    <li className="flyout-right"><a href="#">Chat</a>
                      <ul>
                        <li> <a href="chat.html">Chat App</a></li>
                        <li> <a href="chat-video.html">Video Chat</a></li>
                      </ul>
                    </li>
                    <li className="flyout-right"><a href="#">Users</a>
                      <ul>
                        <li> <a href="user-profile.html">User Profile</a></li>
                        <li> <a href="edit-profile.html">Users Edit</a></li>
                        <li> <a href="user-cards.html">User Cards</a></li>
                      </ul>
                    </li>
                    <li><a href="bookmark.html">Bookmarks</a></li>
                    <li><a href="contacts.html">Contacts</a></li>
                    <li><a href="social-app.html">Social App</a></li>
                  </ul>
                </li>
                <li className="onhover-dropdown"> <span className="f-w-600">More pages</span><span><i className="middle" data-feather="chevron-down"></i></span>
                  <ul className="onhover-show-div left-dropdown">
                    <li><a href="landing-page.html">Landing Page</a></li>
                    <li><a href="sample-page.html">Sample Page</a></li>
                    <li><a href="internationalization.html">Internationalization</a></li>
                    <li className="flyout-right"><a href="#">Starter-Kit</a>
                      <ul> 
                        <li className="flyout-right"><a href="#">Color version</a>
                          <ul>
                            <li> <a href="starter-kit/index.html">Layout Light</a></li>
                            <li> <a href="starter-kit/layout-dark.html">Layout Dark</a></li>
                          </ul>
                        </li>
                        <li className="flyout-right"><a href="#">Page Layout</a>
                          <ul>
                            <li> <a href="starter-kit/boxed.html">Boxed</a></li>
                            <li> <a href="starter-kit/layout-rtl.html">RTL</a></li>
                          </ul>
                        </li>
                        <li> <a href="starter-kit/hide-on-scroll.html">Hide Menu On Scroll</a></li>
                        <li className="flyout-right"><a href="#">Footers</a>
                          <ul>
                            <li> <a href="starter-kit/footer-light.html">Footer Light</a></li>
                            <li> <a href="starter-kit/footer-dark.html">Footer Dark </a></li>
                            <li> <a href="starter-kit/footer-fixed.html">Footer Fixed</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-right col-6 pull-right right-header p-0">
            <ul className="nav-menus">
              <li> 
                <div className="right-header ps-0">
                  <div className="input-group">
                    <div className="input-group-prepend"><span className="input-group-text mobile-search"><i className="fa fa-search"></i></span></div>
                    <input className="form-control" type="text" placeholder="Search Here........" />
                  </div>
                </div>
              </li>
              <li className="serchinput">
                <div className="serchbox"><i data-feather="search"></i></div>
                <div className="form-group search-form">
                  <input type="text" placeholder="Search here..." />
                </div>
              </li>
              <li>
                <div className="mode"><i className="fa fa-moon-o"></i></div>
              </li>
              <li className="onhover-dropdown">
                <div className="notification-box"><i data-feather="bell"></i></div>
                <ul className="notification-dropdown onhover-show-div">
                  <li><i data-feather="bell">            </i>
                    <h6 className="f-18 mb-0">Notitications</h6>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0"><i data-feather="truck"></i></div>
                      <div className="flex-grow-1">
                        <p><a href="order-history.html">Delivery processing </a><span className="pull-right">6 hr</span></p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0"><i data-feather="shopping-cart"></i></div>
                      <div className="flex-grow-1">
                        <p><a href="cart.html">Order Complete</a><span className="pull-right">3 hr</span></p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0"><i data-feather="file-text"></i></div>
                      <div className="flex-grow-1">
                        <p><a href="invoice-template.html">Tickets Generated</a><span className="pull-right">1 hr</span></p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0"><i data-feather="send"></i></div>
                      <div className="flex-grow-1">
                        <p><a href="email_inbox.html">Delivery Complete</a><span className="pull-right">45 min</span></p>
                      </div>
                    </div>
                  </li>
                  <li><a className="btn btn-primary" href="#">Check all notification</a></li>
                </ul>
              </li>
              <li className="onhover-dropdown">
                <div className="message"><i data-feather="message-square"></i></div>
                <ul className="message-dropdown onhover-show-div">
                  <li><i data-feather="message-square">            </i>
                    <h6 className="f-18 mb-0">Messages</h6>
                  </li>
                  <li>
                    <div className="d-flex align-items-start">
                      <div className="message-img bg-light-primary"><img src="../assets/images/user/3.jpg" alt="" /></div>
                      <div className="flex-grow-1">
                        <h5 className="mb-1"><a href="email_inbox.html">Emay Walter</a></h5>
                        <p>Do you want to go see movie?</p>
                      </div>
                      <div className="notification-right"><i data-feather="x"></i></div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-start">
                      <div className="message-img bg-light-primary"><img src="../assets/images/user/6.jpg" alt="" /></div>
                      <div className="flex-grow-1">
                        <h5 className="mb-1"><a href="email_inbox.html">Jason Borne</a></h5>
                        <p>Thank you for rating us.</p>
                      </div>
                      <div className="notification-right"><i data-feather="x"></i></div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-start">
                      <div className="message-img bg-light-primary"><img src="../assets/images/user/10.jpg" alt="" /></div>
                      <div className="flex-grow-1">
                        <h5 className="mb-1"><a href="email_inbox.html">Sarah Loren</a></h5>
                        <p>What`s the project report update?</p>
                      </div>
                      <div className="notification-right"><i data-feather="x"></i></div>
                    </div>
                  </li>
                  <li><a className="btn btn-primary" href="email_inbox.html">Check Messages</a></li>
                </ul>
              </li>
              <li className="maximize"><a href="#!" onclick="javascript:toggleFullScreen()"><i data-feather="maximize-2"></i></a></li>
              <li className="language-nav">
                <div className="translate_wrapper">
                  <div className="current_lang">
                    <div className="lang"><i data-feather="globe"></i></div>
                  </div>
                  <div className="more_lang">
                    <div className="lang selected" data-value="en"><i className="flag-icon flag-icon-us"></i><span className="lang-txt">English<span> (US)</span></span></div>
                    <div className="lang" data-value="de"><i className="flag-icon flag-icon-de"></i><span className="lang-txt">Deutsch</span></div>
                    <div className="lang" data-value="es"><i className="flag-icon flag-icon-es"></i><span className="lang-txt">Espa&ntilde;ol</span></div>
                    <div className="lang" data-value="fr"><i className="flag-icon flag-icon-fr"></i><span className="lang-txt">Fran&ccedil;ais</span></div>
                    <div className="lang" data-value="pt"><i className="flag-icon flag-icon-pt"></i><span className="lang-txt">Portugu&ecirc;s<span> (BR)</span></span></div>
                    <div className="lang" data-value="cn"><i className="flag-icon flag-icon-cn"></i><span className="lang-txt">&#x7B80;&#x4F53;&#x4E2D;&#x6587;</span></div>
                    <div className="lang" data-value="ae"><i className="flag-icon flag-icon-ae"></i><span className="lang-txt">&#x644;&#x639;&#x631;&#x628;&#x64A;&#x629; <span> (ae)</span></span></div>
                  </div>
                </div>
              </li>
              <li className="profile-nav onhover-dropdown">
                <div className="account-user"><i data-feather="user"></i></div>
                <ul className="profile-dropdown onhover-show-div">
                  <li><a href="user-profile.html"><i data-feather="user"></i><span>Account</span></a></li>
                  <li><a href="email_inbox.html"><i data-feather="mail"></i><span>Inbox</span></a></li>
                  <li><a href="edit-profile.html"><i data-feather="settings"></i><span>Settings</span></a></li>
                  <li><a href="login.html"><i data-feather="log-in"> </i><span>Log in</span></a></li>
                </ul>
              </li>strokeLinejoin
            </ul>
          </div>
          <script className="result-template" type="text/x-handlebars-template">
            <div className="ProfileCard u-cf">                        
            <div className="ProfileCard-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-airplay m-0"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon></svg></div>
            <div className="ProfileCard-details">
           
            </div>
            </div>
          </script>
          <script className="empty-template" type="text/x-handlebars-template"><div className="EmptyMessage">Your search turned up 0 results. This most likely means the backend is down, yikes!</div></script>
        </div>
      </div>



 */}

</div>




}