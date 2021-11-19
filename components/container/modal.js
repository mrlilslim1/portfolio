import Image from 'next/image'
import {Fragment, useCallback, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import classNames from 'classnames'
import {Timeline} from 'react-twitter-widgets'
import {ArrowLeftIcon} from '@heroicons/react/outline'

import ScrollBtn from './scrollBtn'
export default function MyDialog(prop) {
  const {
    isOpenModal,
    closeInformation,
    content: {image, name, description, url, alt},
    theme,
  } = prop
  const buttonRef = useRef(null)

  const ShowTweet = useCallback(
    () => (
      <Timeline
        dataSource={{
          sourceType: 'url',
          url: url,
        }}
        options={{
          ...(theme
            ? {theme: 'dark', borderColor: '#A45110'}
            : {theme: 'light', borderColor: '#8d10a4'}),
          tweetLimit: 10,
          ariaPolite: 'rude',
          chrome: 'noheader, nofooter, transparent',
          showReplies: false,
        }}
        renderError={() => <p>Couldn&apos;t load tweet</p>}
      />
    ),
    [theme, url]
  )

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-20 overflow-hidden'
        onClose={closeInformation}
        initialFocus={buttonRef}
      >
        <div className='min-h-screen text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={classNames(
                theme ? 'bg-black ' : 'bg-gray-100',
                'relative inline-block text-left h-screen w-full overflow-auto transition-all'
              )}
            >
              <div className='flex flex-row flex-grow justify-start m-5 md"mx-10 md:my-5'>
                <div
                  type='button'
                  ref={buttonRef}
                  className={classNames(
                    theme ? 'text-gray-200' : 'text-indigo-700',
                    'w-32 text-xl m-3 p-3 inline-flex items-center bg-transparent cursor-pointer transition-transform hover:scale-125 focus:border-2 focus:border-solid focus:border-primary'
                  )}
                  onClick={closeInformation}
                >
                  <ArrowLeftIcon className='h-5 w-5 mr-3' />
                  Back
                </div>
              </div>
              <div className='grid grid-flow-row grid-cols-1 gap-4 p-2 md:grid-cols-2 md:grid-rows-1 xl:grid-rows-2'>
                <div className='row-span-2 m-auto'>
                  <Image
                    src={image}
                    alt={alt}
                    width={350}
                    height={350}
                    quality={100}
                    loading='lazy'
                    crossOrigin='use-credentials'
                    className='object-contain object-center'
                  />
                </div>

                <div
                  className={
                    (classNames(theme ? 'text-yellow-500' : 'text-gray-700'),
                    'text-2xl font-bold text-left xl:row-span-2')
                  }
                >
                  <Dialog.Title as='h3' className='text-center'>
                    {name}
                  </Dialog.Title>
                  <Dialog.Description className='text-xl font-medium tracking-wide p-2'>
                    {description}
                  </Dialog.Description>
                </div>
              </div>
              <div className='divide-y divide-base-100 divide-solid'></div>
              <div className='w-full pt-10 flex flex-col items-center'>
                <p className='text-xl font-bold py-10'>Recent tweets </p>
                <div className='self-center w-full lg:w-2/3'>
                  <ShowTweet />
                </div>
              </div>
              <div className='flex flex-row flex-grow justify-end m-5 md"mx-10 md:my-5'>
                <div
                  type='button'
                  ref={buttonRef}
                  className={classNames(
                    theme
                      ? 'hover:bg-white hover:text-red-500'
                      : 'hover:bg-red-700 hover:text-white',
                    'w-28 text-gray-200 bg-red-500 text-xl m-3 px-1 py-2 rounded-full inline-flex items-center justify-center round cursor-pointer transition duration-300 ease-linear  focus:border-2 focus:border-solid focus:border-primary md:w-32 md:p-3 md:m-5'
                  )}
                  onClick={closeInformation}
                >
                  Back
                </div>
              </div>
              <ScrollBtn />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}