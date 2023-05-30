'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">lincor_backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoursesModule.html" data-type="entity-link" >CoursesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CoursesModule-3e9f4da5bbffddcffda31d56ab06033a43d50587ed1bdbd75bb01dcca7260817ae15c66be0418a463fa3eb7b9236b2764da6e4144864566a68d64a1f91a1bafd"' : 'data-bs-target="#xs-controllers-links-module-CoursesModule-3e9f4da5bbffddcffda31d56ab06033a43d50587ed1bdbd75bb01dcca7260817ae15c66be0418a463fa3eb7b9236b2764da6e4144864566a68d64a1f91a1bafd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CoursesModule-3e9f4da5bbffddcffda31d56ab06033a43d50587ed1bdbd75bb01dcca7260817ae15c66be0418a463fa3eb7b9236b2764da6e4144864566a68d64a1f91a1bafd"' :
                                            'id="xs-controllers-links-module-CoursesModule-3e9f4da5bbffddcffda31d56ab06033a43d50587ed1bdbd75bb01dcca7260817ae15c66be0418a463fa3eb7b9236b2764da6e4144864566a68d64a1f91a1bafd"' }>
                                            <li class="link">
                                                <a href="controllers/CoursesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CoursesModule-3e9f4da5bbffddcffda31d56ab06033a43d50587ed1bdbd75bb01dcca7260817ae15c66be0418a463fa3eb7b9236b2764da6e4144864566a68d64a1f91a1bafd"' : 'data-bs-target="#xs-injectables-links-module-CoursesModule-3e9f4da5bbffddcffda31d56ab06033a43d50587ed1bdbd75bb01dcca7260817ae15c66be0418a463fa3eb7b9236b2764da6e4144864566a68d64a1f91a1bafd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoursesModule-3e9f4da5bbffddcffda31d56ab06033a43d50587ed1bdbd75bb01dcca7260817ae15c66be0418a463fa3eb7b9236b2764da6e4144864566a68d64a1f91a1bafd"' :
                                        'id="xs-injectables-links-module-CoursesModule-3e9f4da5bbffddcffda31d56ab06033a43d50587ed1bdbd75bb01dcca7260817ae15c66be0418a463fa3eb7b9236b2764da6e4144864566a68d64a1f91a1bafd"' }>
                                        <li class="link">
                                            <a href="injectables/CoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokenUserMiddleWare.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TokenUserMiddleWare</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DiscountModule.html" data-type="entity-link" >DiscountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DiscountModule-d8e0f664732a44323cf8d198cafd74243e52b9ac1667d124dd9fc40234f417143e2609758862e7fa20245662af114a237c5dd8492a1127f95483a62b88ec2880"' : 'data-bs-target="#xs-controllers-links-module-DiscountModule-d8e0f664732a44323cf8d198cafd74243e52b9ac1667d124dd9fc40234f417143e2609758862e7fa20245662af114a237c5dd8492a1127f95483a62b88ec2880"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DiscountModule-d8e0f664732a44323cf8d198cafd74243e52b9ac1667d124dd9fc40234f417143e2609758862e7fa20245662af114a237c5dd8492a1127f95483a62b88ec2880"' :
                                            'id="xs-controllers-links-module-DiscountModule-d8e0f664732a44323cf8d198cafd74243e52b9ac1667d124dd9fc40234f417143e2609758862e7fa20245662af114a237c5dd8492a1127f95483a62b88ec2880"' }>
                                            <li class="link">
                                                <a href="controllers/DiscountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscountController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DiscountModule-d8e0f664732a44323cf8d198cafd74243e52b9ac1667d124dd9fc40234f417143e2609758862e7fa20245662af114a237c5dd8492a1127f95483a62b88ec2880"' : 'data-bs-target="#xs-injectables-links-module-DiscountModule-d8e0f664732a44323cf8d198cafd74243e52b9ac1667d124dd9fc40234f417143e2609758862e7fa20245662af114a237c5dd8492a1127f95483a62b88ec2880"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DiscountModule-d8e0f664732a44323cf8d198cafd74243e52b9ac1667d124dd9fc40234f417143e2609758862e7fa20245662af114a237c5dd8492a1127f95483a62b88ec2880"' :
                                        'id="xs-injectables-links-module-DiscountModule-d8e0f664732a44323cf8d198cafd74243e52b9ac1667d124dd9fc40234f417143e2609758862e7fa20245662af114a237c5dd8492a1127f95483a62b88ec2880"' }>
                                        <li class="link">
                                            <a href="injectables/DiscountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscountService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TakeModule.html" data-type="entity-link" >TakeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TakeModule-6651c671e221b0ac44a940a361ed9a9b28eaa63d195812aaf9e511402b1898e0e433e2dbbac34759ca728b872048b3f90eb0c523abc7154840088e06f1a7dccb"' : 'data-bs-target="#xs-controllers-links-module-TakeModule-6651c671e221b0ac44a940a361ed9a9b28eaa63d195812aaf9e511402b1898e0e433e2dbbac34759ca728b872048b3f90eb0c523abc7154840088e06f1a7dccb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TakeModule-6651c671e221b0ac44a940a361ed9a9b28eaa63d195812aaf9e511402b1898e0e433e2dbbac34759ca728b872048b3f90eb0c523abc7154840088e06f1a7dccb"' :
                                            'id="xs-controllers-links-module-TakeModule-6651c671e221b0ac44a940a361ed9a9b28eaa63d195812aaf9e511402b1898e0e433e2dbbac34759ca728b872048b3f90eb0c523abc7154840088e06f1a7dccb"' }>
                                            <li class="link">
                                                <a href="controllers/TakeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TakeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TakeModule-6651c671e221b0ac44a940a361ed9a9b28eaa63d195812aaf9e511402b1898e0e433e2dbbac34759ca728b872048b3f90eb0c523abc7154840088e06f1a7dccb"' : 'data-bs-target="#xs-injectables-links-module-TakeModule-6651c671e221b0ac44a940a361ed9a9b28eaa63d195812aaf9e511402b1898e0e433e2dbbac34759ca728b872048b3f90eb0c523abc7154840088e06f1a7dccb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TakeModule-6651c671e221b0ac44a940a361ed9a9b28eaa63d195812aaf9e511402b1898e0e433e2dbbac34759ca728b872048b3f90eb0c523abc7154840088e06f1a7dccb"' :
                                        'id="xs-injectables-links-module-TakeModule-6651c671e221b0ac44a940a361ed9a9b28eaa63d195812aaf9e511402b1898e0e433e2dbbac34759ca728b872048b3f90eb0c523abc7154840088e06f1a7dccb"' }>
                                        <li class="link">
                                            <a href="injectables/TakeServise.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TakeServise</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestsModule.html" data-type="entity-link" >TestsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TestsModule-058c82572af8d891528cf2d61b9acb7a74e686b3966dcd93e041a6226565ed058aced7531cca2c13c760502db3c55066867d7690f93adbef9b157a7cf3fa6a86"' : 'data-bs-target="#xs-controllers-links-module-TestsModule-058c82572af8d891528cf2d61b9acb7a74e686b3966dcd93e041a6226565ed058aced7531cca2c13c760502db3c55066867d7690f93adbef9b157a7cf3fa6a86"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TestsModule-058c82572af8d891528cf2d61b9acb7a74e686b3966dcd93e041a6226565ed058aced7531cca2c13c760502db3c55066867d7690f93adbef9b157a7cf3fa6a86"' :
                                            'id="xs-controllers-links-module-TestsModule-058c82572af8d891528cf2d61b9acb7a74e686b3966dcd93e041a6226565ed058aced7531cca2c13c760502db3c55066867d7690f93adbef9b157a7cf3fa6a86"' }>
                                            <li class="link">
                                                <a href="controllers/TestsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TestsModule-058c82572af8d891528cf2d61b9acb7a74e686b3966dcd93e041a6226565ed058aced7531cca2c13c760502db3c55066867d7690f93adbef9b157a7cf3fa6a86"' : 'data-bs-target="#xs-injectables-links-module-TestsModule-058c82572af8d891528cf2d61b9acb7a74e686b3966dcd93e041a6226565ed058aced7531cca2c13c760502db3c55066867d7690f93adbef9b157a7cf3fa6a86"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TestsModule-058c82572af8d891528cf2d61b9acb7a74e686b3966dcd93e041a6226565ed058aced7531cca2c13c760502db3c55066867d7690f93adbef9b157a7cf3fa6a86"' :
                                        'id="xs-injectables-links-module-TestsModule-058c82572af8d891528cf2d61b9acb7a74e686b3966dcd93e041a6226565ed058aced7531cca2c13c760502db3c55066867d7690f93adbef9b157a7cf3fa6a86"' }>
                                        <li class="link">
                                            <a href="injectables/TestsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersDiscountModule.html" data-type="entity-link" >UsersDiscountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersDiscountModule-9ada2d5d7fa2b799b0e7de7df22119d00e167ac5927d724f5a4f58744264d3f8baa8f486f168c6662a4a6f51f49d7175100739a1306793ad832841a9cd7b9906"' : 'data-bs-target="#xs-controllers-links-module-UsersDiscountModule-9ada2d5d7fa2b799b0e7de7df22119d00e167ac5927d724f5a4f58744264d3f8baa8f486f168c6662a4a6f51f49d7175100739a1306793ad832841a9cd7b9906"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersDiscountModule-9ada2d5d7fa2b799b0e7de7df22119d00e167ac5927d724f5a4f58744264d3f8baa8f486f168c6662a4a6f51f49d7175100739a1306793ad832841a9cd7b9906"' :
                                            'id="xs-controllers-links-module-UsersDiscountModule-9ada2d5d7fa2b799b0e7de7df22119d00e167ac5927d724f5a4f58744264d3f8baa8f486f168c6662a4a6f51f49d7175100739a1306793ad832841a9cd7b9906"' }>
                                            <li class="link">
                                                <a href="controllers/UsersDiscountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersDiscountController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersDiscountModule-9ada2d5d7fa2b799b0e7de7df22119d00e167ac5927d724f5a4f58744264d3f8baa8f486f168c6662a4a6f51f49d7175100739a1306793ad832841a9cd7b9906"' : 'data-bs-target="#xs-injectables-links-module-UsersDiscountModule-9ada2d5d7fa2b799b0e7de7df22119d00e167ac5927d724f5a4f58744264d3f8baa8f486f168c6662a4a6f51f49d7175100739a1306793ad832841a9cd7b9906"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersDiscountModule-9ada2d5d7fa2b799b0e7de7df22119d00e167ac5927d724f5a4f58744264d3f8baa8f486f168c6662a4a6f51f49d7175100739a1306793ad832841a9cd7b9906"' :
                                        'id="xs-injectables-links-module-UsersDiscountModule-9ada2d5d7fa2b799b0e7de7df22119d00e167ac5927d724f5a4f58744264d3f8baa8f486f168c6662a4a6f51f49d7175100739a1306793ad832841a9cd7b9906"' }>
                                        <li class="link">
                                            <a href="injectables/UsersDiscountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersDiscountService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' :
                                            'id="xs-controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' :
                                        'id="xs-injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VedioModule.html" data-type="entity-link" >VedioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VedioModule-1e746b185be8804675e8f6b97e42dbab8ece11dbc92c1ff5456f2f01903dae1aac442aa1358ab732a81b53ba2da9a0142974e2803c2c82d506cf6dad834e2264"' : 'data-bs-target="#xs-controllers-links-module-VedioModule-1e746b185be8804675e8f6b97e42dbab8ece11dbc92c1ff5456f2f01903dae1aac442aa1358ab732a81b53ba2da9a0142974e2803c2c82d506cf6dad834e2264"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VedioModule-1e746b185be8804675e8f6b97e42dbab8ece11dbc92c1ff5456f2f01903dae1aac442aa1358ab732a81b53ba2da9a0142974e2803c2c82d506cf6dad834e2264"' :
                                            'id="xs-controllers-links-module-VedioModule-1e746b185be8804675e8f6b97e42dbab8ece11dbc92c1ff5456f2f01903dae1aac442aa1358ab732a81b53ba2da9a0142974e2803c2c82d506cf6dad834e2264"' }>
                                            <li class="link">
                                                <a href="controllers/VedioController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VedioController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VedioModule-1e746b185be8804675e8f6b97e42dbab8ece11dbc92c1ff5456f2f01903dae1aac442aa1358ab732a81b53ba2da9a0142974e2803c2c82d506cf6dad834e2264"' : 'data-bs-target="#xs-injectables-links-module-VedioModule-1e746b185be8804675e8f6b97e42dbab8ece11dbc92c1ff5456f2f01903dae1aac442aa1358ab732a81b53ba2da9a0142974e2803c2c82d506cf6dad834e2264"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VedioModule-1e746b185be8804675e8f6b97e42dbab8ece11dbc92c1ff5456f2f01903dae1aac442aa1358ab732a81b53ba2da9a0142974e2803c2c82d506cf6dad834e2264"' :
                                        'id="xs-injectables-links-module-VedioModule-1e746b185be8804675e8f6b97e42dbab8ece11dbc92c1ff5456f2f01903dae1aac442aa1358ab732a81b53ba2da9a0142974e2803c2c82d506cf6dad834e2264"' }>
                                        <li class="link">
                                            <a href="injectables/TokenAdminMiddleWare.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TokenAdminMiddleWare</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokenUserMiddleWare.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TokenUserMiddleWare</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VedioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VedioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/CoursesController.html" data-type="entity-link" >CoursesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DiscountController.html" data-type="entity-link" >DiscountController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TakeController.html" data-type="entity-link" >TakeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TestsController.html" data-type="entity-link" >TestsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersDiscountController.html" data-type="entity-link" >UsersDiscountController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/VedioController.html" data-type="entity-link" >VedioController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/CourseEntity.html" data-type="entity-link" >CourseEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Discount.html" data-type="entity-link" >Discount</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TakeEntity.html" data-type="entity-link" >TakeEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TakenDiscount.html" data-type="entity-link" >TakenDiscount</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TakenSertifikat.html" data-type="entity-link" >TakenSertifikat</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TakenWorkbook.html" data-type="entity-link" >TakenWorkbook</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TestsEntity.html" data-type="entity-link" >TestsEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TopikEntity.html" data-type="entity-link" >TopikEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UsersEntity.html" data-type="entity-link" >UsersEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/VideoEntity.html" data-type="entity-link" >VideoEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/WorkbookEntity.html" data-type="entity-link" >WorkbookEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/WorkbookOpen.html" data-type="entity-link" >WorkbookOpen</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AdminLoginDto.html" data-type="entity-link" >AdminLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppConfig.html" data-type="entity-link" >AppConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCourseDto.html" data-type="entity-link" >CreateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDiscountDto.html" data-type="entity-link" >CreateDiscountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTakeDto.html" data-type="entity-link" >CreateTakeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTestDto.html" data-type="entity-link" >CreateTestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTopikDto.html" data-type="entity-link" >CreateTopikDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUsersDiscountDto.html" data-type="entity-link" >CreateUsersDiscountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVedioDto.html" data-type="entity-link" >CreateVedioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorHandle.html" data-type="entity-link" >ErrorHandle</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseLoginDto.html" data-type="entity-link" >FirebaseLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseRegistrDto.html" data-type="entity-link" >FirebaseRegistrDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InPasswordDto.html" data-type="entity-link" >InPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordDto.html" data-type="entity-link" >PasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordUpdateDto.html" data-type="entity-link" >PasswordUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistrDto.html" data-type="entity-link" >RegistrDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCourseDto.html" data-type="entity-link" >UpdateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDiscountDto.html" data-type="entity-link" >UpdateDiscountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTakeDto.html" data-type="entity-link" >UpdateTakeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTestDto.html" data-type="entity-link" >UpdateTestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUsersDiscountDto.html" data-type="entity-link" >UpdateUsersDiscountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVedioDto.html" data-type="entity-link" >UpdateVedioDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CoursesService.html" data-type="entity-link" >CoursesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DiscountService.html" data-type="entity-link" >DiscountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TakeServise.html" data-type="entity-link" >TakeServise</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TestsService.html" data-type="entity-link" >TestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenAdminMiddleWare.html" data-type="entity-link" >TokenAdminMiddleWare</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenUserMiddleWare.html" data-type="entity-link" >TokenUserMiddleWare</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersDiscountService.html" data-type="entity-link" >UsersDiscountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VedioService.html" data-type="entity-link" >VedioService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Request.html" data-type="entity-link" >Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReturnType.html" data-type="entity-link" >ReturnType</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});