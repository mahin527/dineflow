
function Footer() {
  return (
    <div className='footer @container mx-auto px-5 dark:bg-neutral-900 dark:text-white border-t border-neutral-300 dark:border-neutral-600'>
        <div className='flex flex-col sm:flex-row gap-y-4 items-center justify-between py-8 text-sm md:text-base tracking-wider font-medium'>
        <p className='order-2 sm:order-1'>© 2026 DineFlow. All rights reserved.</p>
        <ul className='flex gap-4 order-1 sm:order-2'>
            <li>
                Terms of Services
            </li>
            <li>
                Privacy Policy
            </li>
        </ul>
        </div>
    </div>
  )
}

export default Footer