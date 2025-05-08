"use client"
import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "../app/globals.css"

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export default function Carousel({ itemData }) {
  console.log(itemData)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {itemData.images?.map((item, index) => ( // replace the index with item.id later on
          <div key={index} className="keen-slider__slide "><img src={item.url} alt="" /></div>
        ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {itemData.images?.map((item, index) => ( // replace the index with item.id later on
          <div key={index} className="keen-slider__slide "><img src={item.url} alt="" /></div>
        ))}
        {/* <div className="keen-slider__slide "><img src="https://images.unsplash.com/photo-1536632087471-3cf3f2986328?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
        <div className="keen-slider__slide "><img src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
        <div className="keen-slider__slide "><img src="https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
        <div className="keen-slider__slide "><img src="https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
        <div className="keen-slider__slide "><img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
        <div className="keen-slider__slide "><img src="https://images.unsplash.com/photo-1616088886430-ccd86fef0713?q=80&w=3749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div> */}
      </div>
    </>
  )
}