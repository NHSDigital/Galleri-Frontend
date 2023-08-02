import '../styles/css/sass.css'

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div class="nhsuk-footer" id="nhsuk-footer">
        <div class="nhsuk-width-container">
          <h2 class="nhsuk-u-visually-hidden">Support links</h2>
          <ul class="nhsuk-footer__list">
            <li class="nhsuk-footer__list-item"><a class="nhsuk-footer__list-item-link" href="#">Accessibility statement</a></li>
            <li class="nhsuk-footer__list-item"><a class="nhsuk-footer__list-item-link" href="#">Contact us</a></li>
            <li class="nhsuk-footer__list-item"><a class="nhsuk-footer__list-item-link" href="#">Cookies</a></li>
            <li class="nhsuk-footer__list-item"><a class="nhsuk-footer__list-item-link" href="#">Privacy policy</a></li>
            <li class="nhsuk-footer__list-item"><a class="nhsuk-footer__list-item-link" href="#">Terms and conditions</a></li>
          </ul>

          <p class="nhsuk-footer__copyright">&copy; Crown copyright</p>
        </div>
      </div>
    </footer>
  )
}
